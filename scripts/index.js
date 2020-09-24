//==========================main-variables-currentPopup==================================
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

const popupPicture = document.querySelector(".popup__picture");
const popupCaption = document.querySelector(".popup__caption");

const template = document.querySelector(".card-template");

const editProfilePopup = document.querySelector(".edit-profile");
const addPlacePopup = document.querySelector(".add-place");
const fullsizePhotoPopup = document.querySelector(".fullsize-picture"); // edited

const popups = document.querySelectorAll(".popup");

function choosePopup(popupName) {
  const editForm = popupName.querySelector(".popup__container");
  const firstLine = editForm.querySelector(".popup__first-line");
  const secondLine = editForm.querySelector(".popup__second-line");
  const submitButton = editForm.querySelector(".popup__submit-button");

  return { editForm, firstLine, secondLine, submitButton };
}

//==========================open/close-popup==================================

function togglePopup(name) {
  name.classList.toggle("popup_opened");
}

function changePopupContent(popup) {
  const currentPopup = choosePopup(popup);
  currentPopup.firstLine.value = profileName.textContent;
  currentPopup.secondLine.value = profileBio.textContent;
}

editProfileButton.addEventListener("click", () =>
  togglePopup(editProfilePopup)
);
editProfileButton.addEventListener("click", () =>
  changePopupContent(editProfilePopup)
);
addPlaceButton.addEventListener("click", () => togglePopup(addPlacePopup));

//==========================closing-listeners==================================

popups.forEach((el) => {
  const closeButton = el.querySelector(".popup__close-icon");
  closeButton.addEventListener("click", () => togglePopup(el));

  el.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    togglePopup(el);
  });
});

//==========================editProfilePopup-content==================================

function editProfile(evt) {
  const currentPopup = choosePopup(editProfilePopup);
  evt.preventDefault();
  profileName.textContent = currentPopup.firstLine.value;
  profileBio.textContent = currentPopup.secondLine.value;
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
  const templateContent = template.content.cloneNode(true);
  const elementName = templateContent.querySelector(".element__name");
  const elementPicture = templateContent.querySelector(".element__picture");
  const deleteButton = templateContent.querySelector(".element__delete-button");
  const likeButton = templateContent.querySelector(".element__like-button");

  elementName.textContent = card.title;
  elementPicture.src = card.image;
  elementPicture.alt = card.alt;

  elementPicture.addEventListener("click", openPhoto);
  deleteButton.addEventListener("click", removePlace);
  likeButton.addEventListener("click", activateLike);

  return templateContent;
}

function renderCards() {
  placeCards.forEach((card) => {
    elements.prepend(initializeCard(card));
  });
}

renderCards(); //edited

//==========================adding-new-pics==================================

function clearInputs(input) {
  input.firstLine.value = "";
  input.secondLine.value = "";
}

function addPlace(evt) {
  const currentPopup = choosePopup(addPlacePopup);
  evt.preventDefault();
  const newCard = {
    title: currentPopup.firstLine.value,
    image: currentPopup.secondLine.value,
    alt: currentPopup.firstLine.value,
  };
  elements.prepend(initializeCard(newCard));
  togglePopup(addPlacePopup);
  clearInputs(currentPopup);
} //edited

addPlacePopup.addEventListener("submit", addPlace);

//==========================deleting-pics==================================

function removePlace(event) {
  event.target.closest(".element").remove();
}

//==========================like===========================================

function activateLike(event) {
  event.target.classList.toggle("element__like-button_active");
}

//==========================validation=====================================




const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.valididty.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('.popup__submit-button_inactive');
  } else {
    buttonElement.classList.remove('.popup__submit-button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
