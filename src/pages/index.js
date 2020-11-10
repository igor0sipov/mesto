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
  apiConfig,
  profileAvatar,
  editAvatarButton,
  updateAvatarPopup,
  updateAvatarForm,
} from "../utils/constants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

//===============================API===================================================
const api = new Api(apiConfig);

Promise.all([api.getUserInfo(), api.getCards()]).then(
  ([userData, baseCards]) => {
    profileName.textContent = userData.name;
    profileBio.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    renderBaseCards(baseCards);
  }
);

//===============================validation===================================================

const editProfileFormValidator = new FormValidator(
  validationSelectors,
  editProfileForm
);
editProfileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationSelectors, addPlaceForm);
placeFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(
  validationSelectors,
  updateAvatarForm
);
updateAvatarFormValidator.enableValidation();

//====================================popups==================================================

const userInfo = new UserInfo({
  name: profileName,
  bio: profileBio,
});

const editPopup = new PopupWithForm(
  {
    popup: editProfilePopup,
    handleFormSubmit: (profilePopupInputs) => {
      api
        .editProfile({
          name: profilePopupInputs.name,
          about: profilePopupInputs.bio,
        })
        .then(() => {
          api.getUserInfo().then((info) => {
            userInfo.setUserInfo({
              newName: info.name,
              newBio: info.about,
            });
          });
          editPopup.close();
          editPopup.setLoadingState(false);
        });
    },
  },
  popupSelectors
);
editPopup.setEventListeners();

const renderCards = (cardData) => {
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
          const card = cards.find((item) => item._id === id); // выбираем нужную карточку
          if (card.likes.length > 0) {
            // проверяем наличие лайков
            const hasLike = card.likes.some((like) => like._id === myId);
            if (hasLike) {
              // проверяем наличие моего лайка
              return api.removeLike(id);
            } else {
              return api.like(id);
            }
          } else {
            return api.like(id);
          }
        });
      },
    },
    cardSelectors,
    myId
  );
  return card;
};

const renderBaseCards = (cardsInfoArray) => {
  const section = new Section(
    {
      items: cardsInfoArray,
      renderer: (cardData) => {
        const card = renderCards(cardData);
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
      api
        .addCard({
          name: placePopupInputs.title,
          link: placePopupInputs.url,
        })
        .then((cardInfo) => {
          const card = renderCards(cardInfo);
          const cardElement = card.initializeCard();
          elements.prepend(cardElement);
          placePopup.close();
          placePopup.setLoadingState(false);
        });
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
      api.deleteCard(confirmDeletePopup.id).then((result) => {
        if (result.ok) {
          const currentCard = Array.from(
            document.querySelectorAll(".element")
          ).find((card) => card.id === confirmDeletePopup.id);
          currentCard.remove();
        }
        deletePopup.close();
        deletePopup.setLoadingState(false);
      });
    },
  },
  popupSelectors
);
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm(
  {
    popup: updateAvatarPopup,
    handleFormSubmit: (avatarPopupInput) => {
      api.updateAvatar(avatarPopupInput.avatar).then(() => {
        api.getUserInfo().then((info) => {
          profileAvatar.src = info.avatar;
        });
        avatarPopup.close();
        avatarPopup.setLoadingState(false);
      });
    },
  },
  popupSelectors
);
avatarPopup.setEventListeners();

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

editAvatarButton.addEventListener("click", () => {
  updateAvatarFormValidator.validate();
  updateAvatarFormValidator.clear();
  avatarPopup.open();
});
