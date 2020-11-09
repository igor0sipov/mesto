export default class Card {
  constructor(
    { data, handleCardClick, handleLikeButtonClick, handleDeleteButtonClick },
    cardSelectors,
    myId
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._selectors = cardSelectors;
    this._myId = myId;
  }

  _openFullsizePhoto() {
    this._handleCardClick({
      image: this._data.link,
      title: this._data.name,
    });
  }

  _getTemplate() {
    const _templateContent = document
      .querySelector(this._selectors.cardTemplate)
      .content.cloneNode(true);
    return _templateContent;
  }

  _like(elem) {
    elem.classList.add(this._selectors.likeButtonActive);
  }

  _removeLike(elem) {
    elem.classList.remove(this._selectors.likeButtonActive);
  }

  _getMyLike(data) {
    return data.likes.filter((like) => like._id === this._myId);
  }

  _setEventListeners(cardElements) {
    cardElements.likeButton.addEventListener("click", () => {
      this._like(cardElements.likeButton);
      const likeData = this._handleLikeButtonClick(this._data._id);
      likeData.then((likeInfo) => {
        const myLike = this._getMyLike(likeInfo);
        if (myLike.length > 0) {
          this._like(cardElements.likeButton);
          cardElements.likeCounter.textContent = likeInfo.likes.length;
        } else {
          this._removeLike(cardElements.likeButton);
          cardElements.likeCounter.textContent = likeInfo.likes.length;
        }
      });
    });

    cardElements.deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this._data._id);
    });

    cardElements.picture.addEventListener(
      "click",
      this._openFullsizePhoto.bind(this)
    );
  }

  initializeCard() {
    const cardTemplate = this._getTemplate();
    const cardElements = {
      card: cardTemplate.querySelector(this._selectors.card),
      picture: cardTemplate.querySelector(this._selectors.picture),
      title: cardTemplate.querySelector(this._selectors.title),
      likeButton: cardTemplate.querySelector(this._selectors.likeButton),
      likeCounter: cardTemplate.querySelector(this._selectors.likeCounter),
      deleteButton: cardTemplate.querySelector(this._selectors.deleteButton),
    };
    this._setEventListeners(cardElements);

    cardElements.picture.src = this._data.link;
    cardElements.title.textContent = this._data.name;
    cardElements.card.id = this._data._id;

    if (this._data.likes) {
      cardElements.likeCounter.textContent = this._data.likes.length;
    }

    if (this._data.owner._id !== this._myId) {
      cardElements.deleteButton.classList.add(
        this._selectors.hiddenDeleteButton
      );
    }

    const myLike = this._getMyLike(this._data);
    if (myLike.length > 0) {
      this._like(cardElements.likeButton);
    }

    return cardTemplate;
  }
}
