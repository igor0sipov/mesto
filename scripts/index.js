//==========================main-variables-init==================================

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const popupPicture = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');


let addPlacePopup
let editProfilePopup

const popup = document.querySelectorAll('.popup');
popup.forEach((elem, index) => {
  if (popup[index].dataset.whatPopup == 'edit-profile') {
    editProfilePopup = elem;
  }
  if (popup[index].dataset.whatPopup == 'add-place') {
    addPlacePopup = elem;
  }
  if (popup[index].dataset.whatPopup == 'fullsize-photo') {
    fullsizePhotoPopup = elem;
  }
})

let editForm;
let firstLine;
let secondLine;
let closeButton;
let submitButton;

//==========================open/close-popup==================================

function choosePopup (popupName) {
  editForm = popupName.querySelector('.popup__container');
  firstLine = editForm.querySelector('.popup__first-line');
  secondLine = editForm.querySelector('.popup__second-line');
  closeButton = editForm.querySelector('.popup__close-icon');
  submitButton = editForm.querySelector('.popup__submit-button');
}

function popupToggle(name) {
  choosePopup(name);
  if(name !== fullsizePhotoPopup) {
    firstLine.value = '';
    secondLine.value = '';
  }
  name.classList.toggle('popup_opened');
  closeButton.addEventListener('click', closePopup);
}

function changePopupContent(popup) {
  choosePopup(popup);
  firstLine.value = profileName.textContent;
  secondLine.value = profileBio.textContent;
}

function closePopup(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  else if (event.target == closeButton) {
    popupToggle(event.path[2]);
  }
  else if (event.target !== closeButton) {
    popupToggle(event.target);
  }
}

editProfileButton.addEventListener('click', () => popupToggle(editProfilePopup));
editProfileButton.addEventListener('click', () => changePopupContent(editProfilePopup));
addPlaceButton.addEventListener('click', () => popupToggle(addPlacePopup));
editProfilePopup.addEventListener('click', closePopup);
addPlacePopup.addEventListener('click', closePopup);
fullsizePhotoPopup.addEventListener('click', closePopup);

//==========================editProfilePopup-content==================================

function editProfile (evt) {
  evt.preventDefault();
  profileName.textContent = firstLine.value;
  profileBio.textContent = secondLine.value;
  popupToggle(editProfilePopup);

}

  editProfilePopup.addEventListener('submit', editProfile);
  addPlacePopup.addEventListener('submit', addPlace);

//==========================fullsize-photo-opening==================================

function openPhoto (event) {
  popupPicture.src = event.target.src;
  popupCaption.textContent = event.target.nextElementSibling.textContent;
  popupToggle(fullsizePhotoPopup);
}

//==========================template-gallery==================================

let placeCards = [
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
  }
];

let templateContent;
let elements;
let elementName;
let elementPicture;
let deleteButton

function placeCardsRender() {

  placeCards.forEach(card => {
    templateContent = document.querySelector('.card-template').content.cloneNode(true);
    elements = document.querySelector('.elements');
    elementName = templateContent.querySelector('.element__name');
    elementPicture = templateContent.querySelector('.element__picture');
    deleteButton =  templateContent.querySelector('.element__delete-button');

    elementName.textContent = card.title;
    elementPicture.src = card.image;
    elements.prepend(templateContent);
    elementPicture.addEventListener('click', openPhoto);
    deleteButton.addEventListener('click', removePlace);
  });

}

placeCardsRender();

//==========================adding-new-pics==================================

function addPlace (evt) {
  choosePopup(addPlacePopup);
  placeCards = [];
  evt.preventDefault();
  const newElem = {
    title: firstLine.value,
    image: secondLine.value
  }
  placeCards.push(newElem);
  popupToggle(addPlacePopup);
  placeCardsRender();
}

addPlacePopup.addEventListener('submit', addPlace);

//==========================deleting-pics==================================

function removePlace (event) {
  event.target.closest('.element').remove();
}
