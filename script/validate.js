const obj = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
});
const showInputError = (formElement, inputElement, obj, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
};
const checkInputValidity = (formElement, inputElement, obj) => {
  const errorMessage = inputElement.validationMessage;
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, obj, errorMessage);
  } else {
      hideInputError(formElement, inputElement, obj);
  }
};
const hasInvalidInput = (input) => {
  return input.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};
const toggleButtonState = (input, buttonElement, obj) => {
  if (hasInvalidInput(input)) {
      buttonElement.classList.add(obj.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};
const setEventListeners = (formElement, obj) => {
  const input = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(input, buttonElement, obj);
  input.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
          checkInputValidity(formElement, inputElement, obj);
          toggleButtonState(input, buttonElement, obj);
      });
  });
};
const enableValidation = (obj) => {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement, obj);
  });
};
enableValidation(obj);
