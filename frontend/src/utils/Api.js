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
    const token = localStorage.getItem("jwt");
    return this._request("/cards", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addNewCard({ name, link }) {
    const token = localStorage.getItem("jwt");
    return this._request("/cards", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardID) {
    const token = localStorage.getItem("jwt");
    return this._request(`/cards/${cardID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return this._request("/users/me", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
  }

  updateUserInfo({ name, about }) {
    const token = localStorage.getItem("jwt");
    return this._request("/users/me", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar(avatar) {
    const token = localStorage.getItem("jwt");
    return this._request("/users/me/avatar", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(avatar),
    });
  }

  changeLikeCardStatus(cardID, isLiked) {
    const token = localStorage.getItem("jwt");
    if (isLiked === true) {
      // remove like
      return this._request(`/cards/${cardID}/likes`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      // add like
      return this._request(`/cards/${cardID}/likes`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }
}

export const api = new Api({
  // baseUrl: "http://localhost:3000",
  baseUrl: "https://api.mestolessvoid.nomoredomains.sbs",
});
