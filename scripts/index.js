//==========================main-variables-init==================================

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const popupPicture = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');



let addPlacePopup
let editProfilePopup

const popups = document.querySelectorAll('.popup');
popups.forEach((elem, index) => {
  if (popups[index].dataset.whatPopup == 'edit-profile') {
    editProfilePopup = elem;
  }
  if (popups[index].dataset.whatPopup == 'add-place') {
    addPlacePopup = elem;
  }
  if (popups[index].dataset.whatPopup == 'fullsize-photo') {
    fullsizePhotoPopup = elem;
  }
});

let editForm;
let firstLine;
let secondLine;
let closeButton;
let submitButton;

//==========================open/close-popup==================================

function choosePopup(popupName) {
  editForm = popupName.querySelector('.popup__container');
  firstLine = editForm.querySelector('.popup__first-line');
  secondLine = editForm.querySelector('.popup__second-line');
  closeButton = editForm.querySelector('.popup__close-icon');
  submitButton = editForm.querySelector('.popup__submit-button');
}

function toggleClass(name) {
  choosePopup(name);
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
    toggleClass(event.path[2]);
  }
  else if (event.target !== closeButton) {
    toggleClass(event.target);
  }
}

editProfileButton.addEventListener('click', () => toggleClass(editProfilePopup));
editProfileButton.addEventListener('click', () => changePopupContent(editProfilePopup));
addPlaceButton.addEventListener('click', () => toggleClass(addPlacePopup));
editProfilePopup.addEventListener('click', closePopup);
addPlacePopup.addEventListener('click', closePopup);
fullsizePhotoPopup.addEventListener('click', closePopup);

//==========================editProfilePopup-content==================================

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = firstLine.value;
  profileBio.textContent = secondLine.value;
  toggleClass(editProfilePopup);
}

editProfilePopup.addEventListener('submit', editProfile);
addPlacePopup.addEventListener('submit', addPlace);

//==========================fullsize-photo-opening==================================

function openPhoto(event) {
  popupPicture.src = event.target.src;
  popupCaption.textContent = event.target.nextElementSibling.textContent;
  toggleClass(fullsizePhotoPopup);
}

//==========================template-gallery==================================

let placeCards = [
  {
    title: 'Алтай',
    image: 'https://images.unsplash.com/photo-1500101460942-f91854be42e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
    alt: 'Дорога в хвойном лесу'
  },
  {
    title: 'Екатеринбург',
    image: 'https://images.unsplash.com/photo-1526722021192-1c0dc9b0921d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
    alt: 'Фото Екатеринбурга с высоты'
  },
  {
    title: 'Кинерма',
    image: 'https://images.unsplash.com/photo-1559029884-4e34093db5b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjIxMTIzfQ&auto=format&fit=crop&w=1349&q=80',
    alt: 'Два деревянных домика, идет снег'
  },
  {
    title: 'Калуга',
    image: 'https://images.unsplash.com/photo-1505551071487-d4a3fd384857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
    alt: 'Река в лесу окутана туманом'
  },
  {
    title: 'Хийденсельга',
    image: 'https://images.unsplash.com/photo-1559029884-e95924923629?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'Два деревянных домика в снегу у реки на берегу котрой лодка'
  },
  {
    title: 'Дунилово',
    image: 'https://images.unsplash.com/photo-1570579425144-46bcf064db84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
    alt: 'Церковь среди деревьев в поле'
  }
];

let templateContent;
let elements;
let elementName;
let elementPicture;
let deleteButton
let likeButton;

function renderPlaceCards() {

  placeCards.forEach(card => {
    templateContent = document.querySelector('.card-template').content.cloneNode(true);
    elements = document.querySelector('.elements');
    elementName = templateContent.querySelector('.element__name');
    elementPicture = templateContent.querySelector('.element__picture');
    deleteButton = templateContent.querySelector('.element__delete-button');
    likeButton = templateContent.querySelector('.element__like-button');

    elementName.textContent = card.title;
    elementPicture.src = card.image;
    elementPicture.alt = card.alt;
    elements.prepend(templateContent);
    elementPicture.addEventListener('click', openPhoto);
    deleteButton.addEventListener('click', removePlace);
    likeButton.addEventListener('click', activateLike)
  });

}

renderPlaceCards();

//==========================adding-new-pics==================================

function addPlace(evt) {
  choosePopup(addPlacePopup);
  placeCards = [];
  evt.preventDefault();
  const newElem = {
    title: firstLine.value,
    image: secondLine.value,
    alt: firstLine.value
  }
  placeCards.push(newElem);
  toggleClass(addPlacePopup);
  renderPlaceCards();
  firstLine.value = '';
  secondLine.value = '';
}

addPlacePopup.addEventListener('submit', addPlace);

//==========================deleting-pics==================================

function removePlace(event) {
  event.target.closest('.element').remove();
}


//==========================like===========================================

function activateLike(event) {
  event.target.classList.toggle('element__like-button_active');
}
