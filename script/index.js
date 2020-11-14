
import {
    FormValidator
}
from './FormValidator.js';
import {
    Card
}
from './Card.js';


const initialCards = [{
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1552588353-5682e06233fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80'
}, {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1555582152-aadcabefc191?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
}, {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1588931251997-e77c99036a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
}, {
    name: 'Тюмень',
    link: 'https://images.unsplash.com/photo-1592801950918-4ce512022ca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
}, {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
}, {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1554844344-c34ea04258c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'
}];
const obj = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
});
const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonAddPopup = document.querySelector('.profile__add-button');
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupFormAdd = document.querySelector('.popup__form_add');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_type_heading');
const jobInput = document.querySelector('.popup__input_type_subheading');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupCloseEdit = document.querySelector('.popup__close_edit');
const popupCloseAdd = document.querySelector('.popup__close_add');
export const popupPhotoFull = document.querySelector('.popup__full');
export const popupPhotoTitle = document.querySelector('.popup__title_photo');
export const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoClose = document.querySelector('.popup__close_photo');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputUrl = document.querySelector('.popup__input_type_url');
const elements = document.querySelector('.elements');
const elementsTeamplate = '#elements_template';

const newFormEdit = new FormValidator(obj, popupFormEdit);
newFormEdit.enableValidation();
const newFormAdd = new FormValidator(obj, popupFormAdd);
newFormAdd.enableValidation();

initialCards.forEach((item) => {
    const card = new Card(item, elementsTeamplate);
    const elementCard = card.renderCard();
    elements.append(elementCard);
});

const createCard = ((item) => {
    const card = new Card(item, elementsTeamplate);
    const elementCard = card.renderCard();
    elements.prepend(elementCard);
});

export function openPopup(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keyup', closePopupEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_open');
        closePopup(popup);
    }
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function editProfileSubmit() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

function addCardSubmit() {
    createCard({
        name: inputTitle.value,
        link: inputUrl.value
    });
    inputTitle.value = '';
    inputUrl.value = '';
    closePopup(popupAdd);
}

buttonAddPopup.addEventListener('click', () => openPopup(popupAdd));
buttonOpenPopup.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
});

popupFormEdit.addEventListener('submit', editProfileSubmit);
popupFormAdd.addEventListener('submit', addCardSubmit);
popupCloseEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseAdd.addEventListener('click', () => closePopup(popupAdd));
popupPhotoClose.addEventListener('click', () => closePopup(popupPhoto));
popupEdit.addEventListener('click', closePopupOverlay);
popupAdd.addEventListener('click', closePopupOverlay);
popupPhoto.addEventListener('click', closePopupOverlay);