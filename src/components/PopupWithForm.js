import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }, selectors) {
    super(popup, selectors);
    this._form = this._popup.querySelector(this._selectors.form);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonDefaultText = this._popup.querySelector(
      ".popup__submit-button"
    ).textContent;
  }

  _getInputValues() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._selectors.input)
    );
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[`${input.name}`] = input.value;
    });

    return inputValues;
  }

  setLoadingState(isLoading) {
    const submitButton = this._popup.querySelector(".popup__submit-button");
    if (isLoading) {
      submitButton.textContent = "Cохранение...";
    } else {
      submitButton.textContent = this._submitButtonDefaultText;
    }
  }

  _submitHandler(event) {
    this.setLoadingState(true);
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
