class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(endpoint, options) {
    return fetch(this._baseUrl + endpoint, options).then(this._checkStatus);
  }

  _checkStatus(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return this._request("/cards", {
      headers: this._headers,
    });
  }

  addNewCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardID) {
    return this._request(`/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request("/users/me", {
      headers: this._headers,
    });
  }

  updateUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (isLiked === true) {
      // remove like
      return this._request(`/cards/${cardID}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    } else {
      // add like
      return this._request(`/cards/${cardID}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    }
  }
}

const token = localStorage.getItem("jwt");

export const api = new Api({
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://api.mestolessvoid.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
