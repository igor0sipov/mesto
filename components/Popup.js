export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._escHandlerBound = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keyup', this._escHandlerBound);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener('keyup', this._escHandlerBound);
  }

  _closingByOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.close();
  }

  _handleEscClose(evt) {
    if (evt.key == "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => {
        this.close();
      });
    this._popup.addEventListener("click", (evt) => {
      this._closingByOverlay(evt);
    });
  }
}
