import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__form')
    }
    submitCard(card) {
        this.handleFormSubmit = card;
    }
    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.handleFormSubmit(this.submitCard());
            this.closePopup();
        });
    }
}