import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ picture, caption }, popupSelector) {
    super(popupSelector);
    this._picture = picture;
    this._caption = caption;
  }

  open() {
    this._popup.querySelector(".popup__picture").src = this._picture;
    this._popup.querySelector('.popup__caption').textContent = this._caption;
    super.open();
  }

}
