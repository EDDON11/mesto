import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form')
    }
    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._formValue = {};
        this._inputList.forEach(input => this._formValue[input.name] = input.value);
        return this._formValue;
    }
    setEventListeners() {
        super.setEventListeners()
        this._popup.addEventListener('submit', () => {
            this.handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }
    closePopup() {
        super.closePopup()
        this._form.reset()
    }
}

    
