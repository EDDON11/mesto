export default class Api {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
  }
  getUserInfo() {
      return fetch(`${this._url}users/me`, {
          method: "GET",
          headers: this._headers,
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  setUserInfo(data) {
      return fetch(`${this._url}users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(data)
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  getInitialCard() {
      return fetch(`${this._url}cards`, {
          method: "GET",
          headers: this._headers
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  getCreateCard(data) {
      return fetch(`${this._url}cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              link: data.link
          })
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  putLikes(_id) {
      return fetch(`${this._url}cards/likes/${_id}`, {
          method: "PUT",
          headers: this._headers,
          body: JSON.stringify({
              _id
          })
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  deleteLikes(_id) {
      return fetch(`${this._url}cards/likes/${_id}`, {
          method: "DELETE",
          headers: this._headers,
          body: JSON.stringify({
              _id
          })
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  deleteCard(_id) {
      return fetch(`${this._url}cards/${_id}`, {
          method: "DELETE",
          headers: this._headers,
          body: JSON.stringify({
              _id
          })
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  updateAvatar(avatar) {
      return fetch(`${this._url}users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify(avatar)
      }).then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}