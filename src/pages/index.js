import "./index.css";
import FormValidator from "../components/FormValidator.js";
import {
  editProfileButton,
  profileName,
  profileBio,
  editProfilePopup,
  editProfileForm,
  nameInput,
  bioInput,
  addPlaceButton,
  addPlacePopup,
  addPlaceForm,
  elements,
  validationSelectors,
  placeCards,
  fullsizePicturePopup,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

//===============================validation===================================================

const editForm = new FormValidator(validationSelectors, editProfileForm);
editForm.enableValidation();
const placeForm = new FormValidator(validationSelectors, addPlaceForm);
placeForm.enableValidation();

//====================================popups==================================================

const userInfo = new UserInfo({
  name: profileName,
  bio: profileBio,
});

const editPopup = new PopupWithForm(
  {
    popupSelector: editProfilePopup,
    handleFormSubmit: (profilePopupInputs) => {
      userInfo.setUserInfo({
        newName: profilePopupInputs.topLine,
        newBio: profilePopupInputs.bottomLine,
      });
      editPopup.close();
    },
  },
  {
    topInput: ".user-name",
    bottomInput: ".user-bio",
  }
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
          ".card-template"
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
    popupSelector: addPlacePopup,
    handleFormSubmit: (placePopupInputs) => {
      renderCards([
        {
          title: placePopupInputs.topLine,
          image: placePopupInputs.bottomLine,
          alt: placePopupInputs.topLine,
        },
      ]);
      placePopup.close();
    },
  },
  {
    topInput: ".place-title",
    bottomInput: ".place-url",
  }
);
placePopup.setEventListeners();

const picturePopup = new PopupWithImage(fullsizePicturePopup);
picturePopup.setEventListeners();

//========================popups-opening/closing==============================================

editProfileButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  bioInput.value = profileInfo.bio;
  editForm.validate();
  editPopup.open();
});

addPlaceButton.addEventListener("click", () => {
  placeForm.validate();
  placeForm.clear();
  placePopup.open();
});

//====================================base-cards-rendering=========================================

renderCards(placeCards);
