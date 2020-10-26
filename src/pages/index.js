import './index.css';

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as constants from "../utils/constants.js";
import { handleCardClick } from "../utils/utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//===============================validation===================================================

constants.formList.forEach((item) => {
  const form = new FormValidator(constants.validationSelectors, item);
  form.enableValidation();
});

//========================popups-opening/closing==============================================

constants.editProfileButton.addEventListener("click", () => {
  const validator =  new FormValidator(constants.validationSelectors, constants.editProfileForm);
  const profileInfo = {
    name: constants.profileName,
    bio: constants.profileBio
  }
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
  const profileInfo = userInfo.getUserInfo();
  constants.name.value = profileInfo.name;
  constants.bio.value = profileInfo.bio;
  validator.validate();
  validator.toggleButtonState();
  popup.open();
});


constants.addPlaceButton.addEventListener("click", () => {
  const validator = new FormValidator(constants.validationSelectors, constants.addPlaceForm);

  const popup = new PopupWithForm({
    popupSelector: constants.addPlacePopup,
    callback: (event) => {
      event.preventDefault();
      const section = new Section(
        {
          items: [
            {
              title: constants.title.value,
              image: constants.url.value,
              alt: constants.title.value,
            },
          ],
          renderer: (item) => {
            const card = new Card(
              {
                data: item,
                handleCardClick: handleCardClick,
              },
              ".card-template"
            );
            const cardElement = card.initializeCard();
            section.addItem(cardElement);
          },
        },
        constants.elements
      );
      section.renderItems();
      popup.close();
    },
  });
  popup.setEventListeners();
  validator.clear();
  validator.toggleButtonState();
  popup.open();
});

//====================================cards-rendering=========================================

const renderBaseCards = () => {
  const section = new Section(
    {
      items: constants.placeCards,
      renderer: (item) => {
        const card = new Card(
          {
            data: item,
            handleCardClick: handleCardClick,
          },
          ".card-template"
        );
        const cardElement = card.initializeCard();
        section.addItem(cardElement);
      },
    },
    constants.elements
  );

  section.renderItems();
};

renderBaseCards();
