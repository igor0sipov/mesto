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
  confirmDeletePopup,
  elements,
  fullsizePicturePopup,
  validationSelectors,
  cardSelectors,
  popupSelectors,
  myId,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

//===============================API===================================================
const apiConfig = {
  token: "fe948c7b-c7fe-4065-b9c1-1b820e5df7d7",
  userProfileUrl: "https://mesto.nomoreparties.co/v1/cohort-17/users/me/",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-17/cards/",
};

const api = new Api(apiConfig);

api.getUserInfo().then((info) => {
  profileName.textContent = info.name;
  profileBio.textContent = info.about;
});

api.getCards().then((cardsInfo) => {
  console.log(cardsInfo);
  renderCards(cardsInfo);
});
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
      api.editProfile({
        name: profilePopupInputs.name,
        about: profilePopupInputs.bio,
      });

      api.getUserInfo().then((info) => {
        userInfo.setUserInfo({
          newName: info.name,
          newBio: info.about,
        });
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
            handleDeleteButtonClick: (id) => {
              confirmDeletePopup.id = id;
              deletePopup.open();
            },
            handleLikeButtonClick: (id) => {
              return api.getCards().then((cards) => {
                const card = cards.filter((item) => item._id === id)[0];
                if (card.likes.length > 0) {
                  const like = card.likes.filter((like) => like._id === myId);
                  if (like.length > 0) {
                    return api.removeLike(id);
                    console.log("DELETE");
                    return false;
                  } else {
                    return api.like(id);
                    console.log("PUT");
                    return true;
                  }
                } else {
                  return api.like(id);
                  console.log("PUT");
                  return true;
                }
              })
            },
          },
          cardSelectors,
          myId
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
      api.addCard({
        name: placePopupInputs.title,
        link: placePopupInputs.url,
      });

      renderCards([
        {
          name: placePopupInputs.title,
          link: placePopupInputs.url,
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

const deletePopup = new PopupWithForm(
  {
    popup: confirmDeletePopup,
    handleFormSubmit: () => {
      api.deleteCard(confirmDeletePopup.id);
      deletePopup.close();
    },
  },
  popupSelectors
);
deletePopup.setEventListeners();

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

// renderCards(placeCards);
