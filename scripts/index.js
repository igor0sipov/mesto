let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
let profileEditButton = document.querySelector('.profile__edit-button');
let editProfilePopup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let formNameInput = form.querySelector('.popup__name');
let formBioInput = form.querySelector('.popup__bio');
let formCloseButton = form.querySelector('.popup__close-icon');
let formSubmitButton = form.querySelector('.popup__submit-button');

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

