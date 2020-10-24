import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as constants from '../utils/constants.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js'

//==========================main-variables-currentPopup==================================

const renderCard = (card) => {
  constants.elements.prepend(card);
};

constants.popupList.forEach(popupElement => {
  const popup = new Popup(popupElement);
  popup.setEventListeners();
})

constants.addPlaceButton.addEventListener('click', () => {
  const popup = new PopupWithForm(constants.addPlacePopup);
  popup.open();
})

constants.editProfileButton.addEventListener('click', () => {
  const popup = new PopupWithForm(constants.editProfilePopup);
  popup.open();
})

const renderBaseCards = () => {
  constants.placeCards.forEach(item => {
    const card = new Card({
      data: item,
      handleCardClick: (popupElement) => {
        const popup = new Popup(popupElement);
        popup.open();
        popup.setEventListeners();
      }
    }, '.card-template');
    const cardElement = card.initializeCard();
    renderCard(cardElement);
  })
}

renderBaseCards();
