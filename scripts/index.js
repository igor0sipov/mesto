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
}

//==========================validation=====================================

const selectors = {
  form: ".form",
  input: ".input",
  submitButton: ".popup__submit-button",
  inactiveButton: "popup__submit-button_disabled",
  inputError: "input_type_error",
  error: "popup__input-error_visible",
};

const showError = (currentInput, name) => {
  const errorElement = name.querySelector(`.${currentInput.id}-error`);
  currentInput.classList.add("input_type_error");
  errorElement.textContent = currentInput.validationMessage;
  errorElement.classList.add("popup__input-error_visible");
};

const hideError = (currentInput, name) => {
  const errorElement = name.querySelector(`.${currentInput.id}-error`);
  currentInput.classList.remove("input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_visible");
};

const checkInputValidity = (currentInput, currentPopup) => {
  if (!currentInput.validity.valid) {
    showError(currentInput, currentPopup);
  } else {
    hideError(currentInput, currentPopup);
  }
};

const validate = (name) => {
  const currentPopup = name;
  const inputList = Array.from(currentPopup.querySelectorAll(".input"));
  inputList.forEach((currentInput) => {
    checkInputValidity(currentInput, currentPopup);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (name) => {
  const buttonElement = name.querySelector(".popup__submit-button");
  const inputList = Array.from(name.querySelectorAll(".input"));

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "true");
    buttonElement.classList.add("popup__submit-button_disabled");
  } else {
    buttonElement.classList.remove("popup__submit-button_disabled");
    buttonElement.removeAttribute("disabled");
  }
};

const setListeners = (name) => {
  const currentPopup = name;
  const form = currentPopup.querySelector(".form");
  const inputList = Array.from(form.querySelectorAll(".input"));
  inputList.forEach((currentInput) => {
    currentInput.addEventListener("input", () => {
      checkInputValidity(currentInput, currentPopup);
      toggleButtonState(currentPopup);
    });
  });
};

const enableValidation = (popupsObject) => {
  Object.values(popupsObject).forEach((name) => {
    setListeners(name);
  });
};

enableValidation(popupsWithForm);

//==========================open/close-popup==================================

const togglePopup = (name) => {
  name.classList.toggle("popup_opened");
}

const changePopupContent = (popup) => {
  const currentPopup = choosePopup(popup);
  currentPopup.firstLine.value = profileName.textContent;
  currentPopup.secondLine.value = profileBio.textContent;
}

const setEscClosingListener = (name) => {
  const closePopup = (evt) => {
    if (evt.key == "Escape") {
      togglePopup(name);
      document.removeEventListener("keyup", closePopup);
    }
  }
  document.addEventListener("keyup", closePopup);
}

const openPopup = (name) => {
  togglePopup(name);
  setEscClosingListener(name);
}

editProfileButton.addEventListener("click", () => {
  changePopupContent(editProfilePopup);
  validate(editProfilePopup);
  toggleButtonState(editProfilePopup);
  openPopup(editProfilePopup);
});
addPlaceButton.addEventListener("click", () => {
  toggleButtonState(addPlacePopup);
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
}

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
} //edited

addPlacePopup.addEventListener("submit", addPlace);

//==========================editProfilePopup-content==================================

const editProfile = (evt) => {
  const currentPopup = choosePopup(editProfilePopup);
  evt.preventDefault();
  profileName.textContent = currentPopup.firstLine.value;
  profileBio.textContent = currentPopup.secondLine.value;
  togglePopup(editProfilePopup);
}

editProfilePopup.addEventListener("submit", editProfile);
addPlacePopup.addEventListener("submit", addPlace);

//==========================fullsize-photo-opening==================================

const openPhoto = (event) => {
  popupPicture.src = event.target.src;
  popupCaption.textContent = event.target.nextElementSibling.textContent;
  openPopup(fullsizePhotoPopup);
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

//==========================deleting-pics==================================

const removePlace = (event) => {
  event.target.closest(".element").remove();
}

//==========================like===========================================

const activateLike = (event) => {
  event.target.classList.toggle("element__like-button_active");
}

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
}

const renderCards = () => {
  placeCards.forEach((card) => {
    elements.prepend(initializeCard(card));
  });
}

renderCards(); //edited

