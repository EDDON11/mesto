export default class Card {
    constructor(data, elementsTeamplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this.elementsTeamplate = elementsTeamplate;
        this.handleCardClick = handleCardClick;
    }
    _getTamplate() {
        const elementCard = document.querySelector(this.elementsTeamplate).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }
    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }
    _setEventListener() {
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.element__like').addEventListener('click', () => this._likeCard());
        this._element.querySelector('.element__pic').addEventListener('click', () => this.handleCardClick(this._name, this._link));
    }
    renderCard() {
        this._element = this._getTamplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__pic').alt = this._name;
        this._element.querySelector('.element__pic').src = this._link;
        this._setEventListener();
        return this._element;
    }
}
