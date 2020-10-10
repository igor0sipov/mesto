export default class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._image = data.image;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _togglePopup() {
    console.log("qwer");
    document
      .querySelector(".fullsize-picture")
      .classList.toggle("popup_opened");
  }

  _openFullsizePhoto(event) {
    document.querySelector(".popup__picture").src = event.target.src;
    document.querySelector(".popup__caption").textContent =
      event.target.nextElementSibling.textContent;
    this._togglePopup();
  }

  _removePlace(event) {
    event.target.closest(".element").remove();
  }

  _activateLike(event) {
    event.target.classList.toggle("element__like-button_active");
  }

  _getTemplate() {
    const templateContent = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return templateContent;
  }

  _setListeners() {
    this._element = this._getTemplate();

    this._element
      .querySelector(".element__picture")
      .addEventListener("click", (evt) => {
        this._openFullsizePhoto(evt);
      });
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", (evt) => {
        this._removePlace(evt);
      });
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", (evt) => {
        this._activateLike(evt);
      });
  }

  initializeCard() {
    this._element = this._getTemplate();
    this._setListeners();

    this._element.querySelector(".element__name").textContent = this._title;
    this._element.querySelector(".element__picture").src = this._image;
    this._element.querySelector(".element__picture").alt = this._alt;

    return this._element;
  }
}
