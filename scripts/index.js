import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import PopupHandler from "./PopupHandler.js";

//==========================main-variables-currentPopup==================================
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

const editProfilePopup = document.querySelector(".edit-profile");
const addPlacePopup = document.querySelector(".add-place");

const elements = document.querySelector(".elements");

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
const placeCards = [
  {
    title: "Алтай",
    image:
      "https://images.unsplash.com/photo-1500101460942-f91854be42e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    alt: "Дорога в хвойном лесу",
  },
  {
    title: "Екатеринбург",
    image:
      "https://images.unsplash.com/photo-1526722021192-1c0dc9b0921d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
    alt: "Фото Екатеринбурга с высоты",
  },
  {
    title: "Кинерма",
    image:
      "https://images.unsplash.com/photo-1559029884-4e34093db5b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=1349&q=80",
    alt: "Два деревянных домика, идет снег",
  },
  {
    title: "Калуга",
    image:
      "https://images.unsplash.com/photo-1505551071487-d4a3fd384857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
    alt: "Река в лесу окутана туманом",
  },
  {
    title: "Хийденсельга",
    image:
      "https://images.unsplash.com/photo-1559029884-e95924923629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    alt: "Два деревянных домика в снегу у реки на берегу котрой лодка",
  },
  {
    title: "Дунилово",
    image:
      "https://images.unsplash.com/photo-1570579425144-46bcf064db84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    alt: "Церковь среди деревьев в поле",
  },
];

const renderBaseCards = () => {
  placeCards.forEach((item) => {
    const card = new Card(item, ".card-template");
    const cardElement = card.initializeCard();
    renderCard(cardElement);
  });
};

renderBaseCards();
