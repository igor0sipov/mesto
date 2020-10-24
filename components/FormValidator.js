export default class FormValidator {
  constructor(selectorsObject, currentForm) {
    this._selectorsObject = selectorsObject;
    this._currentForm = currentForm;
    this._inputList = Array.from(
      currentForm.querySelectorAll(this._selectorsObject.input)
    );
  }

  _showError(currentInput) {
    this._errorElement = this._currentForm.querySelector(
      `.${currentInput.id}-error`
    );
    currentInput.classList.add(this._selectorsObject.inputError);
    this._errorElement.textContent = currentInput.validationMessage;
    this._errorElement.classList.add(this._selectorsObject.errorVisible);
  }

  _hideError(currentInput) {
    this._errorElement = this._currentForm.querySelector(
      `.${currentInput.id}-error`
    );
    currentInput.classList.remove(this._selectorsObject.inputError);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._selectorsObject.errorVisible);
  }

  _checkInputValidity(currentInput) {
    if (!currentInput.validity.valid) {
      this._showError(currentInput);
    } else {
      this._hideError(currentInput);
    }
  }

  _hasInpvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    const _buttonElement = this._currentForm.querySelector(
      this._selectorsObject.submitButton
    );

    if (this._hasInpvalidInput()) {
      _buttonElement.setAttribute("disabled", "true");
      _buttonElement.classList.add(this._selectorsObject.inactiveButton);
    } else {
      _buttonElement.classList.remove(this._selectorsObject.inactiveButton);
      _buttonElement.removeAttribute("disabled");
    }
  }

  _setListeners() {
    this._inputList.forEach((currentInput) => {
      currentInput.addEventListener("input", () => {
        this._checkInputValidity(currentInput);
        this.toggleButtonState();
      });
    });
  }

  validate() {
    this._inputList.forEach((currentInput) => {
      this._checkInputValidity(currentInput);
    });
  }

  enableValidation() {
    const submitFormHandler = (event) => {
      event.preventDefault();
    };
    this._currentForm.addEventListener("submit", submitFormHandler);
    this._setListeners();
  }
}
