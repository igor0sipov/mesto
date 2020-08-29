const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.querySelector('.edit-form');
const form = document.querySelector('.form');
const formNameInput = form.querySelector('.form__name');
const formBioInput = form.querySelector('.form__bio');
const formCloseButton = form.querySelector('.form__close-icon');
const formSubmitButton = form.querySelector('.form__submit-button');

//==========================popup-opening/closing==================================

popupToggle = (event) => {
  editProfileForm.classList.toggle('edit-form_hidden');
}

overlayClosing = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle(event);
}

editButton.addEventListener('click', popupToggle);
formCloseButton.addEventListener('click', popupToggle);
editProfileForm.addEventListener('mousedown', overlayClosing);

//==========================popup-data==================================

formNameInput.value = profileName.innerHTML;
formBioInput.value = profileBio.innerHTML;

formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.innerHTML = formNameInput.value;
  profileBio.innerHTML = formBioInput.value;
  popupToggle(event);
}

form.addEventListener('submit', formSubmitHandler);
