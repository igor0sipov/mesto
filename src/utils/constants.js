export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);
export const profileName = document.querySelector(".profile__name");
export const profileBio = document.querySelector(".profile__bio");
export const profileAvatar = document.querySelector(".profile__avatar");

export const editAvatarButton = document.querySelector(
  ".profile__edit-avatar-button"
);
export const updateAvatarPopup = document.querySelector(".update-avatar");
export const updateAvatarForm = document.forms.updateAvatar;

export const confirmDeletePopup = document.querySelector(".confirm-delete");

export const editProfilePopup = document.querySelector(".edit-profile");
export const editProfileForm = document.forms.editProfileForm;

export const addPlaceButton = document.querySelector(".profile__add-button");
export const addPlacePopup = document.querySelector(".add-place");
export const addPlaceForm = document.forms.addPlaceForm;

export const elements = document.querySelector(".elements");

export const fullsizePicturePopup = document.querySelector(".fullsize-picture");

export const myId = "86dbbabbe99c68a05ddfc98c";

export const apiConfig = {
  token: "fe948c7b-c7fe-4065-b9c1-1b820e5df7d7",
  userProfileUrl: "https://mesto.nomoreparties.co/v1/cohort-17/users/me/",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-17/cards/",
};

export const validationSelectors = {
  form: ".form",
  input: ".popup__input",
  submitButton: ".popup__submit-button",
  inactiveButton: "popup__submit-button_disabled",
  inputError: "popup__input_type_error",
  errorVisible: "popup__input-error_visible",
};

export const cardSelectors = {
  cardTemplate: ".card-template",
  card: ".element",
  picture: ".element__picture",
  title: ".element__name",
  likeButton: ".element__like-button",
  likeButtonActive: "element__like-button_active",
  deleteButton: ".element__delete-button",
  hiddenDeleteButton: "element__delete-button_hidden",
  likeCounter: ".element__like-counter",
};

export const popupSelectors = {
  openedPopup: "popup_opened",
  form: ".form",
  closeButton: ".popup__close-icon",
  title: "popup__title",
  picture: ".popup__picture",
  input: ".popup__input",
  submitButton: ".popup__submit-button",
  caption: ".popup__caption",
};

export const placeCards = [
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
