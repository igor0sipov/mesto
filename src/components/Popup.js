export default class Popup {
  constructor(popup, selectors) {
    this._popup = popup;
    this._selectors = selectors;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(this._selectors.openedPopup);
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._selectors.openedPopup);
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _closeByOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.close();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup
      .querySelector(this._selectors.closeButton)
      .addEventListener("click", () => {
        this.close();
      });
    this._popup.addEventListener("click", (evt) => {
      this._closeByOverlay(evt);
    });
  }
}
