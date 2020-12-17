import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    submitCard(card) {
        this.handleFormSubmit = card;
    }
    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.handleFormSubmit(this.submitCard());
        });
    }
}