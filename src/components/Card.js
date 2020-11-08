import { elements } from "../utils/constants";

export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick },
    cardSelectors,
    myId
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._selectors = cardSelectors;
    this._myId = myId;
    this._likesQuantity = data.likes.length;
  }

  _openFullsizePhoto() {
    this._handleCardClick({
      image: this._data.link,
      title: this._data.name,
    });
  }

  _removePlace(event) {
    this._handleDeleteButtonClick(this._data._id);
    // event.target.closest(this._selectors.card).remove();
  }

  _putLike(elem) {
    elem.classList.add(this._selectors.likeButtonActive);
  }

  _removeLike(elem) {
    elem.classList.remove(this._selectors.likeButtonActive);
  }

  _getTemplate() {
    const templateContent = document
      .querySelector(this._selectors.cardTemplate)
      .content.cloneNode(true);
    return templateContent;
  }

  _setListeners() {
    this._element = this._getTemplate();
    const element = this._getTemplate();
    this._element
      .querySelector(this._selectors.picture)
      .addEventListener("click", this._openFullsizePhoto.bind(this));
    this._element
      .querySelector(this._selectors.deleteButton)
      .addEventListener("click", (evt) => {
        this._removePlace(evt);
      });
    this._element
      .querySelector(this._selectors.likeButton)
      .addEventListener("click", (evt) => {
        this._handleLikeButtonClick(this._data._id).then((likeData) => {
            console.log(likeData);
            const id = this._myId;
            const myLike = likeData.likes.filter(like => like._id === id);

            if(myLike.length > 0) {
              this._putLike(evt.target);
              evt.target.nextElementSibling.textContent = likeData.likes.length;
            } else {
              this._removeLike(evt.target);
              evt.target.nextElementSibling.textContent = likeData.likes.length;
            }
        });
      });
  }

  _renderLikes(elem) {
    const myLike = this._data.likes.filter((like) => like._id === this._myId);
    if (myLike.length > 0) {
      this._putLike(elem);
    }
  }


  initializeCard() {
    this._element = this._getTemplate();
    this._setListeners();

    const elementPicture = this._element.querySelector(this._selectors.picture);
    const deleteButton = this._element.querySelector(
      this._selectors.deleteButton
    );
    const likeButton = this._element.querySelector(this._selectors.likeButton);
    likeButton.id = this._data._id;
    const likeCounter = this._element.querySelector(
      this._selectors.likeCounter
    );

    this._renderLikes(likeButton);

    likeCounter.textContent = this._likesQuantity;

    if (this._data.owner._id !== this._myId) {
      deleteButton.classList.add("element__delete-button_hidden");
    }

    this._element.querySelector(
      this._selectors.title
    ).textContent = this._data.name;
    elementPicture.src = this._data.link;
    elementPicture.alt = this._data.name;

    return this._element;
  }
}
