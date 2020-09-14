//==========================main-variables-init==================================

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

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
  firstLine.value = '';
  secondLine.value = '';
  name.classList.toggle('popup_opened');
  closeButton.addEventListener('click', closePopup);
}

function changeLineValues(popup) {
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
editProfileButton.addEventListener('click', () => changeLineValues(editProfilePopup));
addPlaceButton.addEventListener('click', () => popupToggle(addPlacePopup));
editProfilePopup.addEventListener('click', closePopup);
addPlacePopup.addEventListener('click', closePopup);

//==========================editProfilePopup-content==================================

function editProfile (evt) {
  evt.preventDefault();
  profileName.textContent = firstLine.value;
  profileBio.textContent = secondLine.value;
  popupToggle(editProfilePopup);

}

  editProfilePopup.addEventListener('submit', editProfile);
  addPlacePopup.addEventListener('submit', addPlace);

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

function placeCardsRender() {

  placeCards.forEach(card => {
    const templateContent = document.querySelector('.card-template').content.cloneNode(true);
    const elements = document.querySelector('.elements');
    const elementName = templateContent.querySelector('.element__name');
    const elementPicture = templateContent.querySelector('.element__picture');

    elementName.textContent = card.title;
    elementPicture.src = card.image;
    elements.prepend(templateContent);
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


//==========================open-picture==================================

