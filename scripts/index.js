const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

// const addPlacePopup = document.querySelector('.add-place-js');
// const editProfilePopup = document.querySelector('.edit-profile-js');

let addPlacePopup
let editProfilePopup

const popup = document.querySelectorAll('.popup');
popup.forEach((elem, index) => {
  if (popup[index].dataset.whatPopup == 'edit-profile') {
    addPlacePopup = elem;
  }
  if (popup[index].dataset.whatPopup == 'add-place') {
    editProfilePopup = elem;
  }
})


let editForm;
let firstLine;
let secondLine;
let closeButton;
let submitButton;

function popupIs (popup) {
  editForm = popup.querySelector('.popup__container');
  firstLine = editForm.querySelector('.popup__name');
  secondLine = editForm.querySelector('.popup__bio');
  closeButton = editForm.querySelector('.popup__close-ico');
  submitButton = editForm.querySelector('.popup__submit-button');
}

function popupToggle(name) {
  popupIs(name);
  firstLine.value = '';
  secondLine.value = '';
  name.classList.toggle('popup_opened');
}

function changeLineValues(popup) {
  popupIs(popup);
  firstLine.value = profileName.textContent;
  secondLine.value = profileBio.textContent;
}

function closePopup(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggle(this);
}

editProfileButton.addEventListener('click', () => popupToggle(editProfilePopup));
editProfileButton.addEventListener('click', () => changeLineValues(editProfilePopup));
addPlaceButton.addEventListener('click', () => popupToggle(addPlacePopup));
editProfilePopup.addEventListener('click', closePopup);
addPlacePopup.addEventListener('click', closePopup);

//==========================popup-data==================================

function editProfile (evt) {
  evt.preventDefault();
  profileName.textContent = firstLine.value;
  profileBio.textContent = secondLine.value;
  popupToggle(editProfilePopup);

}

function addPlace (evt) {
  popupIs(addPlacePopup);
  initialCards = [];
  evt.preventDefault();
  const newElem = {
    title: firstLine.value,
    image: secondLine.value
  }
  initialCards.push(newElem);
  popupToggle(addPlacePopup);
  initialCardsRender();
}

  editProfilePopup.addEventListener('submit', editProfile);
  addPlacePopup.addEventListener('submit', addPlace);

//==========================template-gallery==================================

let initialCards = [
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

