import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupHandler from "../components/PopupHandler.js";
import * as constants from '../utils/constants.js';
import Popup from '../components/Popup.js';

//==========================main-variables-currentPopup==================================

const renderCard = (card) => {
  constants.elements.prepend(card);
};

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
