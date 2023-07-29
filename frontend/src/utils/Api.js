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
      return this._request(`/cards/likes/${cardID}`, {
        method: "DELETE",
        headers: this._headers,
      });
    } else {
      // add like
      return this._request(`/cards/likes/${cardID}`, {
        method: "PUT",
        headers: this._headers,
      });
    }
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "22f549e9-e0fd-461e-9588-c9d853933dcc",
    "Content-Type": "application/json",
  },
});
