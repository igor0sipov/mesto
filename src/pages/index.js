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
  const userInfo = new UserInfo({
    name: constants.profileName,
    bio: constants.profileBio,
  });
  const profile = userInfo.getUserInfo();
  const popupWithForm = new PopupWithForm({
    popupSelector: constants.editProfilePopup,
    callback: (event) => {
      event.preventDefault();
      const newInfo = popupWithForm.getInputValues();
      userInfo.setUserInfo({
        newName: newInfo.name,
        newBio: newInfo.bio,
      });
      popupWithForm.close();
    },
  });
  popupWithForm.setEventListeners();
  popupWithForm.setDefaultValues({
    defaultName: profile.name,
    defaultBio: profile.bio,
  });
  validator.validate();
  validator.toggleButtonState();
  popupWithForm.open();
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
      ]);
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
