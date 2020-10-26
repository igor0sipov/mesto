import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, callback }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._callback = callback;
    this._boundCallback = this._callback.bind(this);
    this._firstLine = this._form.querySelector(".popup__first-line");
    this._secondLine = this._form.querySelector(".popup__second-line");
  }

  setDefaultValues({ defaultName, defaultBio }) {
    this._firstLine.value = defaultName;
    this._secondLine.value = defaultBio;
  }

  getInputValues() {
    const name = this._firstLine.value;
    const bio = this._secondLine.value;
    return { name, bio };
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
