import {
    FormValidator
}
from '../components/FormValidator.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
    popupSelectorAvatar,
    avatarSelector,
    popupFormAvatar,
    profileAvatarButton,
    profileNameSelector,
    profileJobSelector,
    buttonEditPopup,
    buttonAddPopup,
    popupFormEdit,
    popupFormAdd,
    nameInput,
    jobInput,
    popupSelectorEdit,
    popupSelectorAdd,
    popupPhoto,
    elements,
    popupDelete,
    elementsTeamplate
}
from '../utils/const.js'
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js'
import '../pages/index.css';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
const validationConfig = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
});
let userId
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        "Content-Type": "application/json",
        authorization: "2828a81c-91b3-4dda-937b-4ff777409bb5"
    },
});
Promise.all([api.getInitialCard(), api.getUserInfo()]).then((data) => {
    userId = data[1]._id;
    profile.setUserInfo(data[1]);
    cardList.renderItems(data[0]);
}).catch((err) => {
    console.log('Ошибка:', err)
})
const cardList = new Section({
    renderer: (card) => {
        cardList.addItem(createCard(card));
    }
}, elements);
const createCard = (item) => {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            popupWithImage.openPopup(item.name, item.link)
        },
        handleDeleteClick: () => {
            popupCardDelete.openPopup();
            popupCardDelete.submitCard(() => {
                api.deleteCard(item._id).then(() => {
                    card.deleteCard();
                    popupCardDelete.closePopup();
                }).catch((err) => {
                    console.log('Ошибка:', err)
                })
            })
        },
        handleLikeAdd: () => {
            api.putLikes(item._id).catch((err) => console.log('Ошибка:', err));
        },
        handleLikeDelete: () => {
            api.deleteLikes(item._id).catch((err) => console.log('Ошибка:', err));
        },
        userId: userId,
    }, elementsTeamplate);
    const elementCard = card.renderCard();
    return elementCard
}
const profile = new UserInfo(profileNameSelector, profileJobSelector, avatarSelector);
const editProfileValidator = new FormValidator(validationConfig, popupFormEdit);
editProfileValidator.enableValidation();
const addCardValidator = new FormValidator(validationConfig, popupFormAdd);
addCardValidator.enableValidation();
const setAvatarValidator = new FormValidator(validationConfig, popupFormAvatar);
setAvatarValidator.enableValidation();
const popupWithImage = new PopupWithImage(popupPhoto);
popupWithImage.setEventListeners();
const popupCardDelete = new PopupWithSubmit(popupDelete);
popupCardDelete.setEventListeners();
const popupAddForm = new PopupWithForm({
    popupSelector: popupSelectorAdd,
    handleFormSubmit: (formData) => {
        popupAddForm.renderLoadingAdd(true)
        api.getCreateCard({
            name: formData.name,
            link: formData.link
        }).then((data) => {
            cardList.addItem(createCard(data))
            popupAddForm.closePopup()
        }).catch((err) => {
            console.log('Ошибка:', err);
        }).finally(() => popupAddForm.renderLoadingAdd(false));
    }
});
const popupEditForm = new PopupWithForm({
    popupSelector: popupSelectorEdit,
    handleFormSubmit: (formData) => {
        popupEditForm.renderLoading(true)
        api.setUserInfo(formData).then((userData) => {
            profile.setUserInfo(userData)
            popupEditForm.closePopup()
        }).catch((err) => {
            console.log('Ошибка:', err);
        }).finally(() => popupEditForm.renderLoading(false));
    }
});
const popupAvatarForm = new PopupWithForm({
    popupSelector: popupSelectorAvatar,
    handleFormSubmit: (formData) => {
        popupAvatarForm.renderLoading(true)
        api.updateAvatar(formData).then((avatar) => {
            profile.setUserInfo(avatar)
            popupAvatarForm.closePopup()
        }).catch((err) => {
            console.log('Ошибка:', err);
        }).finally(() => popupAvatarForm.renderLoading(false));
    }
});
profileAvatarButton.addEventListener('click', () => {
    popupAvatarForm.openPopup();
    profile.getUserInfo();
    setAvatarValidator.disableButton();
    setAvatarValidator.cleanError()
})
buttonEditPopup.addEventListener('click', () => {
    popupEditForm.openPopup();
    const inputValue = profile.getUserInfo();
    nameInput.value = inputValue.name;
    jobInput.value = inputValue.about;
    editProfileValidator.disableButton()
    editProfileValidator.cleanError();
});
buttonAddPopup.addEventListener("click", () => {
    popupAddForm.openPopup();
    addCardValidator.disableButton();
    addCardValidator.cleanError();
});
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupAvatarForm.setEventListeners()