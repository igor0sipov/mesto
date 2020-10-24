export default class PopupHandler {
  constructor(popup) {
    this._popup = popup;
    this._escClosingBound = this._closingByEsc.bind(this);
  }

  _closingByEsc(evt) {
    if (evt.key == "Escape") {
      this.closePopup();
    }
  }

  _closingByOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.closePopup();
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._escClosingBound);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._escClosingBound);
  }

  setPopupClosingListeners() {
    this._popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => {
        this.closePopup();
      });
    this._popup.addEventListener("click", (evt) => {
      this._closingByOverlay(evt);
    });
  }
}
