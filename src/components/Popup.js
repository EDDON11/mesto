export default class Popup {
   constructor(popupSelector) {
       this._popup = document.querySelector(popupSelector);
       this._handleEscClose = this._handleEscClose.bind(this);
   }
   openPopup() {
       this._popup.classList.add('popup_open');
       document.addEventListener('keyup', this._handleEscClose);
   }
   closePopup() {
       this._popup.classList.remove('popup_open');
       document.removeEventListener('keydown', this._handleEscClose);
   }
   _handleEscClose(evt) {
       if (evt.key === 'Escape') {
           this.closePopup()
       }
   }
   _handleOverlayClose(evt) {
       if (evt.target.classList.contains('popup_open')) {
           this.closePopup()
       }
   }
   setEventListeners() {
       const closeButton = this._popup.querySelector('.popup__close');
       closeButton.addEventListener('click', this.closePopup.bind(this));
       this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
   }
}