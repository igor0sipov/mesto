import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(source, title) {
    const popupPicture = this._popup.querySelector(this._selectors.picture);
    const popupCaption = this._popup.querySelector(this._selectors.caption);
    popupPicture.src = source;
    popupCaption.textContent = title;
    popupPicture.alt = title;
    super.open();
  }
}
