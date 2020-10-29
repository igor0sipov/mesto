import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, { topInput, bottomInput }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._topInput = this._form.querySelector(topInput);
    this._bottomInput = this._form.querySelector(bottomInput);
  }

  _getInputValues() {
    const topLine = this._topInput.value;
    const bottomLine = this._bottomInput.value;
    return { topLine, bottomLine };
  }

  _submitHandler(event) {
    event.preventDefault();
    const popupInputs = this._getInputValues();
    this._handleFormSubmit(popupInputs);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", this._submitHandler.bind(this));
  }
}
