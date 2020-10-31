import "./index.css";
import FormValidator from "../components/FormValidator.js";
import {
  editProfileButton,
  profileName,
  profileBio,
  editProfilePopup,
  editProfileForm,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
  elements,
  fullsizePicturePopup,
  validationSelectors,
  cardSelectors,
  popupSelectors,
  placeCards,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

//===============================validation===================================================

const editProfileFormValidator = new FormValidator(
  validationSelectors,
  editProfileForm
);
editProfileFormValidator.enableValidation();
const placeFormValidator = new FormValidator(validationSelectors, addPlaceForm);
placeFormValidator.enableValidation();

//====================================popups==================================================

const userInfo = new UserInfo({
  name: profileName,
  bio: profileBio,
});

const editPopup = new PopupWithForm(
  {
    popup: editProfilePopup,
    handleFormSubmit: (profilePopupInputs) => {
      userInfo.setUserInfo({
        newName: profilePopupInputs.name,
        newBio: profilePopupInputs.bio,
      });
      editPopup.close();
    },
  },
  popupSelectors
);
editPopup.setEventListeners();

const renderCards = (cardsInfoArray) => {
  const section = new Section(
    {
      items: cardsInfoArray,
      renderer: (cardData) => {
        const card = new Card(
          {
            data: cardData,
            handleCardClick: ({ image, title }) => {
              picturePopup.open(image, title);
            },
          },
          cardSelectors
        );
        const cardElement = card.initializeCard();
        section.addItem(cardElement);
      },
    },
    elements
  );

  section.renderItems();
};

const placePopup = new PopupWithForm(
  {
    popup: addPlacePopup,
    handleFormSubmit: (placePopupInputs) => {
      renderCards([
        {
          title: placePopupInputs.title,
          image: placePopupInputs.url,
          alt: placePopupInputs.title,
        },
      ]);
      placePopup.close();
    },
  },
  popupSelectors
);
placePopup.setEventListeners();

const picturePopup = new PopupWithImage(fullsizePicturePopup, popupSelectors);
picturePopup.setEventListeners();

//========================popups-opening/closing==============================================

editProfileButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  editProfileForm.elements.name.value = profileInfo.name;
  editProfileForm.elements.bio.value = profileInfo.bio;
  editProfileFormValidator.validate();
  editPopup.open();
});

addPlaceButton.addEventListener("click", () => {
  placeFormValidator.validate();
  placeFormValidator.clear();
  placePopup.open();
});

//====================================base-cards-rendering=========================================

renderCards(placeCards);
