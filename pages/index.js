import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupHandler from "../components/PopupHandler.js";
import * as constants from '../utils/constants.js';

//==========================main-variables-currentPopup==================================


const choosePopup = (popupName) => {
  const editForm = popupName.querySelector(".popup__container");
  const firstLine = editForm.querySelector(".popup__first-line");
  const secondLine = editForm.querySelector(".popup__second-line");
  const submitButton = editForm.querySelector(".popup__submit-button");

  return { editForm, firstLine, secondLine, submitButton };
};

//==========================validation=====================================
const selectors = {
  form: ".form",
  input: ".input",
  submitButton: ".popup__submit-button",
  inactiveButton: "popup__submit-button_disabled",
  inputError: "input_type_error",
  errorVisible: "popup__input-error_visible",
};

const formList = Array.from(document.querySelectorAll(".popup__container"));

formList.forEach((item) => {
  const form = new FormValidator(selectors, item);
  form.enableValidation();
});

//==========================open/close-popup==================================
const changePopupContent = (popup) => {
  const currentPopup = choosePopup(popup);
  currentPopup.firstLine.value = profileName.textContent;
  currentPopup.secondLine.value = profileBio.textContent;
};

const renderCard = (card) => {
  elements.prepend(card);
};

const addPlace = (evt) => {
  const currentPopup = choosePopup(addPlacePopup);
  evt.preventDefault();
  const newCard = {
    title: currentPopup.firstLine.value,
    image: currentPopup.secondLine.value,
    alt: currentPopup.firstLine.value,
  };
  const card = new Card(newCard, ".card-template");
  const popupHandler = new PopupHandler(addPlacePopup);
  renderCard(card.initializeCard());
  popupHandler.closePopup();
  currentPopup.editForm.reset();
};

const editProfile = (evt) => {
  const currentPopup = choosePopup(editProfilePopup);
  const popupHandler = new PopupHandler(editProfilePopup);
  evt.preventDefault();
  profileName.textContent = currentPopup.firstLine.value;
  profileBio.textContent = currentPopup.secondLine.value;
  popupHandler.closePopup();
};

Array.from(document.querySelectorAll(".popup")).forEach((popupItem) => {
  const popupHandler = new PopupHandler(popupItem);
  popupHandler.setPopupClosingListeners();

  if ((popupItem = addPlacePopup)) {
    popupItem.addEventListener("submit", addPlace);
  }
  if ((popupItem = editProfilePopup)) {
    popupItem.addEventListener("submit", editProfile);
  }
});

editProfileButton.addEventListener("click", () => {
  const validator = new FormValidator(
    selectors,
    choosePopup(editProfilePopup).editForm
  );
  const popupHandler = new PopupHandler(editProfilePopup);
  changePopupContent(editProfilePopup);
  validator.validate();
  validator.toggleButtonState();
  popupHandler.openPopup();
});

addPlaceButton.addEventListener("click", () => {
  const validator = new FormValidator(
    selectors,
    choosePopup(addPlacePopup).editForm
  );
  const popupHandler = new PopupHandler(addPlacePopup);
  validator.toggleButtonState();
  popupHandler.openPopup();
});

//==========================template-gallery==================================


const renderBaseCards = () => {
  placeCards.forEach((item) => {
    const card = new Card(item, ".card-template");
    const cardElement = card.initializeCard();
    renderCard(cardElement);
  });
};

renderBaseCards();
