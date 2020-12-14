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
const obj = ({
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

const getinfo = api.getUserInfo();
getinfo.then((data) => {
    profile.setUserInfo(data);
    userId = data._id;
}).catch((err) => console.log('Ошибка:', err));

const cards = api.getInitialCard();
cards.then((data) => {
    cardList.renderItems(data);
}).catch((err) => console.log('Ошибка:', err));


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
                }).catch((err) => {
                    console.log('Ошибка:', err)
                })
            })
        },
        handleLikeAdd: () => {
            api.putLikes(item._id)
        },
        handleLikeDelete: () => {
            api.deleteLikes(item._id)
        },
        userId: userId,
    }, elementsTeamplate);
    const elementCard = card.renderCard();
    return elementCard
}
const profile = new UserInfo(profileNameSelector, profileJobSelector, avatarSelector);
const newFormEdit = new FormValidator(obj, popupFormEdit);
newFormEdit.enableValidation();
const newFormAdd = new FormValidator(obj, popupFormAdd);
newFormAdd.enableValidation();
const newFormAvatar = new FormValidator(obj, popupFormAvatar);
newFormAvatar.enableValidation();
const popupWithImage = new PopupWithImage(popupPhoto);
popupWithImage.setEventListeners();
const popupCardDelete = new PopupWithSubmit(popupDelete);
popupCardDelete.setEventListeners();

const popupAddForm = new PopupWithForm({
    popupSelector: popupSelectorAdd,
    handleFormSubmit: (formData) => {
        api.getCreateCard({
            name: formData.name,
            link: formData.link
        }).then((data) => {
            cardList.addItemPrepend(createCard(data))
        }).catch((err) => {
            console.log('Ошибка:', err)
        });
    },
});
const popupEditForm = new PopupWithForm({
    popupSelector: popupSelectorEdit,
    handleFormSubmit: (formData) => {
        api.setUserInfo(formData).then((userData) => {
            profile.setUserInfo(userData)
        }).catch((err) => {
            console.log('Ошибка:', err)
        });
    },
});
const popupAvatarForm = new PopupWithForm({
    popupSelector: popupSelectorAvatar,
    handleFormSubmit: (formData) => {
        api.updateAvatar(formData).then((avatar) => {
            profile.setUserAvatar(avatar)
        }).catch((err) => {
            console.log('Ошибка:', err)
        });
    }
})
profileAvatarButton.addEventListener('click', () => {
    popupAvatarForm.openPopup();
    profile.getUserInfo();
})
buttonEditPopup.addEventListener('click', () => {
    popupEditForm.openPopup();
    const inputValue = profile.getUserInfo();
    nameInput.value = inputValue.name;
    jobInput.value = inputValue.about;
});
buttonAddPopup.addEventListener("click", () => {
    popupAddForm.openPopup();
});
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupAvatarForm.setEventListeners()