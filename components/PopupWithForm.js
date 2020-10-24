class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._popup = popupSelector;
    this._callback = callback;
  }

  _getInputValues() {}

  close() {
    super.close();

  }

  setEventListeners() {}
}
