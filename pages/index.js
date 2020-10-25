import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as constants from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//===============================validation==========================================

constants.formList.forEach(item => {
  const form = new FormValidator(constants.validationSelectors, item);
  form.enableValidation();
});

//========================popups-opening/closing=====================================

const handleCardClick = (popupElement) => {
  const popup = new Popup(popupElement);
  popup.setEventListeners();
  popup.open();
};

constants.addPlaceButton.addEventListener("click", () => {
  const firstLine = constants.addPlacePopup.querySelector(".popup__first-line");
  const secondLine = constants.addPlacePopup.querySelector(
    ".popup__second-line"
  );
  const popup = new PopupWithForm({
    popupSelector: constants.addPlacePopup,
    callback: (event) => {
      event.preventDefault();
      const section = new Section(
        {
          items: [
            {
              title: firstLine.value,
              image: secondLine.value,
              alt: firstLine.value,
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
  popup.open();
});

constants.editProfileButton.addEventListener("click", () => {
  const firstLine = constants.editProfilePopup.querySelector(
    ".popup__first-line"
  );
  const secondLine = constants.editProfilePopup.querySelector(
    ".popup__second-line"
  );
  const userInfo = new UserInfo(constants.profileName, constants.profileBio);

  const popup = new PopupWithForm({
    popupSelector: constants.editProfilePopup,
    callback: (event) => {
      event.preventDefault();
      userInfo.setUserInfo(firstLine.value, secondLine.value);
      popup.close();
    },
  });
  popup.setEventListeners();
  const profileInfo = userInfo.getUserInfo();
  firstLine.value = profileInfo.name;
  secondLine.value = profileInfo.bio;
  popup.open();
});

const renderCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: handleCardClick,
    },
    ".card-template"
  );
  const cardElement = card.initializeCard();
  section.addItem(cardElement);
};

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
