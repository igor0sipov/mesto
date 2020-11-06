export default class Api {
  constructor(config) {
    this._token = config.token;
    this._userProfileUrl = config.userProfileUrl;
    this._cardsUrl = config.cardsUrl;
  }

  _newFetch(url, options) {
    return fetch(url, options)
      .then((result) => {
        if (!result.ok) {
          return Promise.reject("Server error");
        }
        return result.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        alert(err);
      });
  }

  getUserInfo() {
    return this._newFetch(this._userProfileUrl, {
      headers: {
        authorization: this._token,
      },
    });
  }

  getCards() {
    return this._newFetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
      },
    });
  }

  editProfile({ name, about }) {
    return this._newFetch(this._userProfileUrl, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard({ name, link }) {
    return this._newFetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._newFetch(this._cardsUrl + id, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
  }
}
