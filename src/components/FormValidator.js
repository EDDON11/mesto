export class FormValidator {
  constructor(obj, formElement) {
      this._formSelector = obj.formSelector;
      this._inputSelector = obj.inputSelector;
      this._submitButtonSelector = obj.submitButtonSelector;
      this._inactiveButtonClass = obj.inactiveButtonClass;
      this._inputErrorClass = obj.inputErrorClass;
      this._errorClass = obj.errorClass;
      this._formElement = formElement;
  }
  _showInputError(formElement, inputElement, errorMessage) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  };
  _hideInputError(formElement, inputElement) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
  };
  _checkInputValidity(formElement, inputElement) {
      const errorMessage = inputElement.validationMessage;
      if (!inputElement.validity.valid) {
          this._showInputError(formElement, inputElement, errorMessage);
      } else {
          this._hideInputError(formElement, inputElement);
      }
  };
  _hasInvalidInput(input) {
      return input.some((inputElement) => {
          return !inputElement.validity.valid;
      });
  };
  _toggleButtonState(input, buttonElement) {
      if (this._hasInvalidInput(input)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
      } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
      }
  };
  _setEventListeners(formElement) {
      const input = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(input, buttonElement);
      input.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(formElement, inputElement);
              this._toggleButtonState(input, buttonElement);
          });
      });
  };
  enableValidation() {
      const forms = Array.from(document.querySelectorAll(this._formSelector));
      forms.forEach((formElement) => {
          formElement.addEventListener('submit', (evt) => {
              evt.preventDefault();
          });
          this._setEventListeners(formElement);
      });
  };
}


