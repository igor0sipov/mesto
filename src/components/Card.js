export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._handleCardClick = handleCardClick;
    this._title = data.title;
    this._image = data.image;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _openFullsizePhoto() {
    this._handleCardClick({
      image: this._image,
      title: this._title,
    });
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
      .addEventListener("click", this._openFullsizePhoto.bind(this));
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
