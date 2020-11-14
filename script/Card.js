import {
    openPopup,
    popupPhoto,
    popupPhotoFull,
    popupPhotoTitle
}
from "./index.js";
export class Card {
    constructor(data, elementsTeamplate) {
        this._name = data.name;
        this._link = data.link;
        this.elementsTeamplate = elementsTeamplate;
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
    _openPhoto() {
        openPopup(popupPhoto);
        popupPhotoFull.src = this._link;
        popupPhotoTitle.textContent = this._name;
    }
    _setEventListener() {
        this._element.querySelector('.element__delete-button').addEventListener('click', () => this._deleteCard());
        this._element.querySelector('.element__like').addEventListener('click', () => this._likeCard());
        this._element.querySelector('.element__pic').addEventListener('click', () => this._openPhoto());
    }
    renderCard() {
        this._element = this._getTamplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__pic').alt = this._link;
        this._element.querySelector('.element__pic').src = this._link;
        this._setEventListener();
        return this._element;
    }
}



