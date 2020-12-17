export default class Card {
    constructor({
        data,
        handleDeleteClick,
        handleCardClick,
        handleLikeAdd,
        handleLikeDelete,
        userId
    }, elementsTeamplate) {
        this._name = data.name;
        this._link = data.link;
        this.elementsTeamplate = elementsTeamplate;
        this.handleCardClick = handleCardClick;
        this.handleDeleteClick = handleDeleteClick;
        this.handleLikeDelete = handleLikeDelete;
        this.handleLikeAdd = handleLikeAdd;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._userId = userId;
    }
    _getTamplate() {
        const elementCard = document.querySelector(this.elementsTeamplate).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }
    handleLikeClick() {
        this._like = this._element.querySelector('.element__like');
        if (this._like.classList.contains('element__like_active')) {
            this._element.querySelector('.element__likos').textContent = this._likes.length -= 1;
            this._like.classList.remove('element__like_active');
            this.handleLikeDelete(this._id);
        } else {
            this._like.classList.add('element__like_active');
            this._element.querySelector('.element__likos').textContent = this._likes.length += 1;
            this.handleLikeAdd(this._id);
        }
    }
    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
    _checkCard() {
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.element__delete-button').style.display = 'none';
        };
    }
    _checkLike() {
        this._element.querySelector('.element__likos').textContent = this._likes.length;
        if (this._likes.some(item => item._id === this._userId)) {
            this._likeCard()
        }
    }

    _withImage() {
        this._element.querySelector('.element__title').textContent = this._name;
        const imageElement = this._element.querySelector('.element__pic');
        imageElement.src = this._link;
        imageElement.alt = this._name;

    }
    deleteCard() {
        this._element.remove();
        this._element = null;
    }
    _setEventListener() {
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this.handleDeleteClick());
        this._element.querySelector('.element__like').addEventListener('click', () => this.handleLikeClick());
        this._element.querySelector('.element__pic').addEventListener('click', () => this.handleCardClick());
    }
    renderCard() {
        this._element = this._getTamplate();
        this._withImage();
        this._checkCard();
        this._checkLike()
        this._setEventListener();
        return this._element;
    }
}