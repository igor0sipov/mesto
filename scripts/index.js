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
console.log(profileName.textContent);

function changeInputsValues(event){
  formNameInput.value = profileName.textContent;
  formBioInput.value = profileBio.textContent;
}

function popupToggle(event) {
  editProfilePopup.classList.toggle('popup_opened');
}


function overlayClosing(event) {
  if (event.target !== event.currentTarget) {
    return
  }
  popupToggle(event);
}

profileEditButton.addEventListener('click', popupToggle);
profileEditButton.addEventListener('click', changeInputsValues);
formCloseButton.addEventListener('click', popupToggle);
editProfilePopup.addEventListener('click', overlayClosing); //edited

//==========================popup-data==================================

function formSubmitHandler(evt) {
  console.log(evt);
  evt.preventDefault();
  profileName.textContent = formNameInput.value;
  profileBio.textContent = formBioInput.value;
  popupToggle(evt);
}

form.addEventListener('submit', formSubmitHandler);

