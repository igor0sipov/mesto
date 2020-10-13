import PopupHandler from "./PopupHandler.js";

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._image = data.image;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _openFullsizePhoto(event) {
    this._popup = document.querySelector(".fullsize-picture");
    const picture = document.querySelector(".popup__picture");
    picture.src = event.target.src;
    document.querySelector(".popup__caption").textContent =
      event.target.nextElementSibling.textContent;
    const popupHandler = new PopupHandler(this._popup);
    popupHandler.openPopup();
    popupHandler.setPopupClosingListeners();
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
      .addEventListener("click", this._openFullsizePhoto);
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

    const elementPicture = this._element.querySelector(".element__picture");

    this._element.querySelector(".element__name").textContent = this._title;
    elementPicture.src = this._image;
    elementPicture.alt = this._alt;

    return this._element;
  }
}
