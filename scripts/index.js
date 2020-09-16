//==========================main-variables-init==================================

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

const popupPicture = document.querySelector(".popup__picture");
const popupCaption = document.querySelector(".popup__caption");

const editProfilePopup = document.querySelector(".edit-profile");
const addPlacePopup = document.querySelector(".add-place");
const fullsizePhotoPopup = document.querySelector(".fullsize-picture"); // edited

//==========================open/close-popup==================================

let editForm;
function choosePopup(popupName) {
  editForm = popupName.querySelector(".popup__container");
}
choosePopup(editProfilePopup);

const firstLine = editForm.querySelector(".popup__first-line");
const secondLine = editForm.querySelector(".popup__second-line");
const closeButton = editForm.querySelector(".popup__close-icon");
const submitButton = editForm.querySelector(".popup__submit-button");

function togglePopup(name) {
  choosePopup(name);
  name.classList.toggle("popup_opened");
  closeButton.addEventListener("click", closePopup);
}

function changePopupContent(popup) {
  choosePopup(popup);
  firstLine.value = profileName.textContent;
  secondLine.value = profileBio.textContent;
}

function closePopup(event) {
  if (event.target !== event.currentTarget) {
    return;
  } else if (event.target == closeButton) {
    togglePopup(event.path[2]);
  } else if (event.target !== closeButton) {
    togglePopup(event.target);
  }
}

editProfileButton.addEventListener("click", () =>
  togglePopup(editProfilePopup)
);
editProfileButton.addEventListener("click", () =>
  changePopupContent(editProfilePopup)
);
addPlaceButton.addEventListener("click", () => togglePopup(addPlacePopup));
editProfilePopup.addEventListener("click", closePopup);
addPlacePopup.addEventListener("click", closePopup);
fullsizePhotoPopup.addEventListener("click", closePopup);

//==========================editProfilePopup-content==================================

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = firstLine.value;
  profileBio.textContent = secondLine.value;
  togglePopup(editProfilePopup);
}

editProfilePopup.addEventListener("submit", editProfile);
addPlacePopup.addEventListener("submit", addPlace);

//==========================fullsize-photo-opening==================================

function openPhoto(event) {
  popupPicture.src = event.target.src;
  popupCaption.textContent = event.target.nextElementSibling.textContent;
  togglePopup(fullsizePhotoPopup);
}

//==========================template-gallery==================================

const placeCards = [
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
const elements = document.querySelector(".elements");

function initializeCard(card) {
  const template = document.querySelector(".card-template");
  const templateContent = template.content.cloneNode(true);
  const elementName = templateContent.querySelector(".element__name");
  const elementPicture = templateContent.querySelector(".element__picture");
  const deleteButton = templateContent.querySelector(".element__delete-button");
  const likeButton = templateContent.querySelector(".element__like-button");

  elementName.textContent = card.title;
  elementPicture.src = card.image;
  elementPicture.alt = card.alt;

  return templateContent;
}

function renderCards() {
  placeCards.forEach((card) => {
    elements.prepend(initializeCard(card));
  });
}

renderCards();
//==========================adding-new-pics==================================

function addPlace(evt) {
  choosePopup(addPlacePopup);
  placeCards = [];
  evt.preventDefault();
  const newElem = {
    title: firstLine.value,
    image: secondLine.value,
    alt: firstLine.value,
  };
  placeCards.push(newElem);
  togglePopup(addPlacePopup);
  renderPlaceCards();
  firstLine.value = "";
  secondLine.value = "";
}

addPlacePopup.addEventListener("submit", addPlace);

//==========================deleting-pics==================================

function removePlace(event) {
  event.target.closest(".element").remove();
}

//==========================like===========================================

function activateLike(event) {
  event.target.classList.toggle("element__like-button_active");
}
