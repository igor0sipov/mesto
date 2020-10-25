import Popup from "../components/Popup.js";

export const handleCardClick = (popupElement) => {
  const popup = new Popup(popupElement);
  popup.setEventListeners();
  popup.open();
};
