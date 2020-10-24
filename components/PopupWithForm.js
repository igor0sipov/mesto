import Popup from "./Popup.js";
import UserInfo from './UserInfo.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._popup = popupSelector;
    this._form = this._popup.querySelector('.form');
    this._callback = callback;
  }

  // _getInputValues() {
  //   const values = {}
  //   const inputList = Array.from(this._form.querySelectorAll('input'));
  //   inputList.forEach(input => {
  //     values['test'] = input.value;
  //   })
  // }

  // close() {
  //   super.close();
  // }

  // setEventListeners() {

  // }
}
