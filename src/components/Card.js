export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteButtonClick },
    cardSelectors,
    myId
  ) {
    this._handleCardClick = handleCardClick;
    this._title = data.name;
    this._image = data.link;
    this._alt = data.name;
    this._selectors = cardSelectors;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._photoId = data._id;
  }

  _openFullsizePhoto() {
    this._handleCardClick({
      image: this._image,
      title: this._title,
    });
  }

  _removePlace(event) {
    this._handleDeleteButtonClick(this._photoId);
    // event.target.closest(this._selectors.card).remove();
  }

  _activateLike(event) {
    event.target.classList.toggle(this._selectors.likeButtonActive);
  }

  _getTemplate() {
    const templateContent = document
      .querySelector(this._selectors.cardTemplate)
      .content.cloneNode(true);
    return templateContent;
  }

  _setListeners() {
    this._element = this._getTemplate();
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
        this._activateLike(evt);
      });
  }

  initializeCard() {
    this._element = this._getTemplate();
    this._setListeners();

    const elementPicture = this._element.querySelector(this._selectors.picture);
    const deleteButton = this._element.querySelector(
      this._selectors.deleteButton
    );

    if (this._ownerId !== this._myId) {
      deleteButton.classList.add("element__delete-button_hidden");
    }

    this._element.querySelector(
      this._selectors.title
    ).textContent = this._title;
    elementPicture.src = this._image;
    elementPicture.alt = this._alt;

    return this._element;
  }
}
