import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupTitle = this._popup.querySelector('.popup__title_photo');
        this._popupImage = this._popup.querySelector('.popup__full');
    }
    openPopup(name, link) {
        super.openPopup()
        this._popupTitle.textContent = name;
        this._popupImage.alt = name;
        this._popupImage.src = link;
    }
}