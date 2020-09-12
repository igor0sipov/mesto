const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.edit-profile-js');
const form = document.querySelector('.popup__container');
const formNameInput = form.querySelector('.popup__name');
const formBioInput = form.querySelector('.popup__bio');
const formCloseButton = form.querySelector('.popup__close-icon');
const formSubmitButton = form.querySelector('.popup__submit-button');

//==========================popup-opening/closing==================================

function changeInputsValues(event) {
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
  evt.preventDefault();
  profileName.textContent = formNameInput.value;
  profileBio.textContent = formBioInput.value;
  popupToggle(evt);
}

form.addEventListener('submit', formSubmitHandler);

//==========================template-gallery==================================

const initialCards = [
  {
    title: 'Алтай',
    image: 'https://images.unsplash.com/photo-1500101460942-f91854be42e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
  },
  {
    title: 'Екатеринбург',
    image: 'https://images.unsplash.com/photo-1526722021192-1c0dc9b0921d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'
  },
  {
    title: 'Кинерма',
    image: 'https://images.unsplash.com/photo-1559029884-4e34093db5b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=1349&q=80'
  },
  {
    title: 'Калуга',
    image: 'https://images.unsplash.com/photo-1505551071487-d4a3fd384857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'
  },
  {
    title: 'Хийденсельга',
    image: 'https://images.unsplash.com/photo-1559029884-e95924923629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: 'Дунилово',
    image: 'https://images.unsplash.com/photo-1570579425144-46bcf064db84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
  },
];

function initialCardsRender() {

  initialCards.forEach(card => {

    const templateContent = document.querySelector('.card-template').content.cloneNode(true);
    const elements = document.querySelector('.elements');
    const elementName = templateContent.querySelector('.element__name');
    const elementPicture = templateContent.querySelector('.element__picture');

    elementName.textContent = card.title;
    elementPicture.src = card.image;
    elements.prepend(templateContent);

  });

}

initialCardsRender();

//==========================adding-new-pics==================================

