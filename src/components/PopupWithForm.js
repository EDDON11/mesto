import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor({
        popupSelector,
        handleFormSubmit
    }) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form')
        this._button = this._popup.querySelector('.popup__save-button');
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
        });
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Сохранение...';
        } else {
            this._button.textContent = 'Сохранить';
        }
    }
    renderLoadingAdd(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Создание...';
        } else {
            this._button.textContent = 'Создать';
        }
    }
    closePopup() {
        super.closePopup()
        this._form.reset();
    }
}

    
