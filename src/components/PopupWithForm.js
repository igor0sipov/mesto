import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, callback }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._callback = callback;
    this._boundCallback = this._callback.bind(this);
  }

  _getInputValues() {
    const firstLine = this._form.querySelector(".popup__first-line").value;
    const secondLine = this._form.querySelector(".popup__second-line").value;
    return { firstLine, secondLine };
  }

  close() {
    super.close();
    this._form.reset();
    this._popup.removeEventListener("submit", this._boundCallback);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._boundCallback);
  }
}
