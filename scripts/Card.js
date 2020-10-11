export default class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._image = data.image;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _togglePopup() {
    const _popup = document.querySelector(".fullsize-picture");
    _popup.classList.toggle("popup_opened");

    if (_popup.classList.contains("popup_opened")) {
      this._setClosingListeners(_popup);
    } else {
      this._removeListeners();
    }
  }

  _setClosingListeners(popup) {
    this._removeListeners = () => {
      document.removeEventListener("keyup", _closePopupByEsc);
      popup
        .querySelector(".popup__close-icon")
        .removeEventListener("click", _closePopupByButton);
      popup.removeEventListener("click", _closePopupByOverlay);
    };

    const _closePopupByEsc = (evt) => {
      if (evt.key == "Escape") {
        this._togglePopup();
      }
    };

    const _closePopupByButton = () => {
      this._togglePopup();
    };

    const _closePopupByOverlay = (evt) => {
      if (evt.target !== evt.currentTarget) {
        return;
      }
      this._togglePopup();
    };

    document.addEventListener("keyup", _closePopupByEsc);
    popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", _closePopupByButton);
    popup.addEventListener("click", _closePopupByOverlay);
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
