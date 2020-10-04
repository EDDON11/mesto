const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const buttonSavePopup = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');
const popupBody = document.querySelector('.popup__body')
let  formElement = document.querySelector('.popup__form');
let  porfileName = document.querySelector('.profile__title');
let  profileJob = document.querySelector('.profile__subtitle');
let  nameInput = document.querySelector('.popup__input-heading');
let  jobInput  = document.querySelector('.popup__input-subheading');



function openPopup() {

    popup.classList.add('popup__open');
    nameInput.value = porfileName.textContent;
    jobInput.value = profileJob.textContent;
}



function closePopup() {

    popup.classList.remove('popup__open');



}    
    
    
function formSubmitHandler (evt) {
            evt.preventDefault();

            porfileName.textContent = nameInput.value;
            profileJob.textContent = jobInput.value;
            closePopup(); 
    }
        

    buttonOpenPopup.addEventListener('click', openPopup);
    buttonClosePopup.addEventListener('click', closePopup);
    buttonSavePopup.addEventListener('click', closePopup);
    formElement.addEventListener('submit', formSubmitHandler); 

    


