import "./index.css";

import FormValidator from "../components/FormValidator.js";
import * as constants from "../utils/constants.js";
import { renderCards } from "../utils/utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


//===============================validation===================================================

constants.formList.forEach((item) => {
  const form = new FormValidator(constants.validationSelectors, item);
  form.enableValidation();
});

//========================popups-opening/closing==============================================

constants.editProfileButton.addEventListener("click", () => {
  const validator = new FormValidator(
    constants.validationSelectors,
    constants.editProfileForm
  );
  const profileInfo = {
    name: constants.profileName,
    bio: constants.profileBio,
  };
  const userInfo = new UserInfo(profileInfo);

  const popup = new PopupWithForm({
    popupSelector: constants.editProfilePopup,
    callback: (event) => {
      event.preventDefault();
      userInfo.setUserInfo(constants.name.value, constants.bio.value);
      popup.close();
    },
  });
  popup.setEventListeners();
  const info = userInfo.getUserInfo();
  constants.name.value = info.name;
  constants.bio.value = info.bio;
  validator.validate();
  validator.toggleButtonState();
  popup.open();
});

constants.addPlaceButton.addEventListener("click", () => {
  const validator = new FormValidator(
    constants.validationSelectors,
    constants.addPlaceForm
  );

  const popup = new PopupWithForm({
    popupSelector: constants.addPlacePopup,
    callback: (event) => {
      event.preventDefault();
      renderCards([
        {
          title: constants.title.value,
          image: constants.url.value,
          alt: constants.title.value,
        },
      ])
      popup.close();
    },
  });
  popup.setEventListeners();
  validator.clear();
  validator.toggleButtonState();
  popup.open();
});

//====================================base-cards-rendering=========================================

  renderCards(constants.placeCards);
