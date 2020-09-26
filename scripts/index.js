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

const popupsArray = Array.from(document.querySelectorAll(".popup"));

const popupsWithForm = {
  editProfilePopup,
  addPlacePopup,
};

const choosePopup = (popupName) => {
  const editForm = popupName.querySelector(".popup__container");
  const firstLine = editForm.querySelector(".popup__first-line");
  const secondLine = editForm.querySelector(".popup__second-line");
  const submitButton = editForm.querySelector(".popup__submit-button");

  return { firstLine, secondLine, submitButton };
};

//==========================validation=====================================

const selectors = {
  form: ".form",
  input: ".input",
  submitButton: ".popup__submit-button",
  inactiveButton: "popup__submit-button_disabled",
  inputError: "input_type_error",
  errorVisible: "popup__input-error_visible",
};

const showError = (currentInput, popup, selectorsObject) => {
  const errorElement = popup.querySelector(`.${currentInput.id}-error`);
  currentInput.classList.add(selectorsObject.inputError);
  errorElement.textContent = currentInput.validationMessage;
  errorElement.classList.add(selectorsObject.errorVisible);
};

const hideError = (currentInput, popup, selectorsObject) => {
  const errorElement = popup.querySelector(`.${currentInput.id}-error`);
  currentInput.classList.remove(selectorsObject.inputError);
  errorElement.textContent = "";
  errorElement.classList.remove(selectorsObject.errorVisible);
};

const checkInputValidity = (currentInput, currentPopup, selectorsObject) => {
  if (!currentInput.validity.valid) {
    showError(currentInput, currentPopup, selectorsObject);
  } else {
    hideError(currentInput, currentPopup, selectorsObject);
  }
};

const validate = (popup, selectorsObject) => {
  const currentPopup = popup;
  const inputList = Array.from(
    currentPopup.querySelectorAll(selectorsObject.input)
  );
  inputList.forEach((currentInput) => {
    checkInputValidity(currentInput, currentPopup, selectorsObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (popup, selectorsObject) => {
  const buttonElement = popup.querySelector(selectorsObject.submitButton);
  const inputList = Array.from(popup.querySelectorAll(selectorsObject.input));

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "true");
    buttonElement.classList.add(selectorsObject.inactiveButton);
  } else {
    buttonElement.classList.remove(selectorsObject.inactiveButton);
    buttonElement.removeAttribute("disabled");
  }
};

const setListeners = (popup, selectorsObject) => {
  const currentPopup = popup;
  const form = currentPopup.querySelector(selectorsObject.form);
  const inputList = Array.from(form.querySelectorAll(selectorsObject.input));
  inputList.forEach((currentInput) => {
    currentInput.addEventListener("input", () => {
      checkInputValidity(currentInput, currentPopup, selectorsObject);
      toggleButtonState(currentPopup, selectorsObject);
    });
  });
};

const enableValidation = (popupsObject, selectorsObject) => {
  Object.values(popupsObject).forEach((popup) => {
    setListeners(popup, selectorsObject);
  });
};

enableValidation(popupsWithForm, selectors);

//==========================open/close-popup==================================

const togglePopup = (popup) => {
  popup.classList.toggle("popup_opened");
};

const changePopupContent = (popup) => {
  const currentPopup = choosePopup(popup);
  currentPopup.firstLine.value = profileName.textContent;
  currentPopup.secondLine.value = profileBio.textContent;
};

const setEscClosingListener = (popup) => {
  const closePopup = (evt) => {
    if (evt.key == "Escape") {
      togglePopup(popup);
      document.removeEventListener("keyup", closePopup);
      popup.removeEventListener('keyup', closePopup)
    }
  };
  document.addEventListener("keyup", closePopup);
  popup.addEventListener('keyup', closePopup)
};

const openPopup = (popup) => {
  togglePopup(popup);
  setEscClosingListener(popup);
};

editProfileButton.addEventListener("click", () => {
  changePopupContent(editProfilePopup);
  validate(editProfilePopup, selectors);
  toggleButtonState(editProfilePopup, selectors);
  openPopup(editProfilePopup);
});
addPlaceButton.addEventListener("click", () => {
  toggleButtonState(addPlacePopup, selectors);
  openPopup(addPlacePopup);
});

//==========================closing-listeners==================================

popupsArray.forEach((el) => {
  const closeButton = el.querySelector(".popup__close-icon");
  closeButton.addEventListener("click", () => togglePopup(el));

  el.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    togglePopup(el);
  });
});

//==========================adding-new-pics==================================

const clearInputs = (input) => {
  input.firstLine.value = "";
  input.secondLine.value = "";
};

const addPlace = (evt) => {
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
}; //edited

addPlacePopup.addEventListener("submit", addPlace);

//==========================editProfilePopup-content==================================

const editProfile = (evt) => {
  const currentPopup = choosePopup(editProfilePopup);
  evt.preventDefault();
  profileName.textContent = currentPopup.firstLine.value;
  profileBio.textContent = currentPopup.secondLine.value;
  togglePopup(editProfilePopup);
};

editProfilePopup.addEventListener("submit", editProfile);
addPlacePopup.addEventListener("submit", addPlace);

//==========================fullsize-photo-opening==================================

const openPhoto = (event) => {
  popupPicture.src = event.target.src;
  popupCaption.textContent = event.target.nextElementSibling.textContent;
  openPopup(fullsizePhotoPopup);
};

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

//==========================deleting-pics==================================

const removePlace = (event) => {
  event.target.closest(".element").remove();
};

//==========================like===========================================

const activateLike = (event) => {
  event.target.classList.toggle("element__like-button_active");
};

//==========================render-cards===================================

const initializeCard = (card) => {
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
};

const renderCards = () => {
  placeCards.forEach((card) => {
    elements.prepend(initializeCard(card));
  });
};

renderCards(); //edited
