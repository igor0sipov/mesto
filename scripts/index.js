const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup');
const form = document.querySelector('.popup__container');
const formNameInput = form.querySelector('.popup__name');
const formBioInput = form.querySelector('.popup__bio');
const formCloseButton = form.querySelector('.popup__close-icon');
const formSubmitButton = form.querySelector('.popup__submit-button');

//==========================popup-opening/closing==================================

popupToggle = (event) => {
  editProfilePopup.classList.toggle('popup_opened');
  formNameInput.value = profileName.innerHTML;
  formBioInput.value = profileBio.innerHTML;
}

overlayClosing = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle(event);
}

profileEditButton.addEventListener('click', popupToggle);
formCloseButton.addEventListener('click', popupToggle);
editProfilePopup.addEventListener('mousedown', overlayClosing);

//==========================popup-data==================================



formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.innerHTML = formNameInput.value;
  profileBio.innerHTML = formBioInput.value;
  popupToggle(event);
}

form.addEventListener('submit', formSubmitHandler);

