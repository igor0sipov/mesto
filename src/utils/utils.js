import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { elements } from "./constants.js";

export const renderCards = (cardsArray) => {
  const section = new Section(
    {
      items: cardsArray,
      renderer: (cardData) => {
        const card = new Card(
          {
            data: cardData,
            handleCardClick: ({ image, title }, popup) => {
              const popupWithImage = new PopupWithImage(
                {
                  picture: image,
                  caption: title,
                },
                popup
              );
              popupWithImage.setEventListeners();
              popupWithImage.open();
            },
          },
          ".card-template"
        );
        const cardElement = card.initializeCard();
        section.addItem(cardElement);
      },
    },
    elements
  );

  section.renderItems();
};
