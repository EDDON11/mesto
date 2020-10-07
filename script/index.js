const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const buttonSavePopup = document.querySelector('.popup__save-button');
const popup = document.querySelector('.popup');
let  formElement = document.querySelector('.popup__form');
let  porfileName = document.querySelector('.profile__title');
let  profileJob = document.querySelector('.profile__subtitle');
let  nameInput = document.querySelector('.popup__input_type_heading');
let  jobInput  = document.querySelector('.popup__input_type_subheading');



function openPopup() {

    popup.classList.add('popup_open');
    nameInput.value = porfileName.textContent;
    jobInput.value = profileJob.textContent;
}



function closePopup() {

    popup.classList.remove('popup_open');



}    
    
    
function formSubmitHandler (evt) {
            evt.preventDefault();

            porfileName.textContent = nameInput.value;
            profileJob.textContent = jobInput.value;
            closePopup(); 
    }
        

buttonOpenPopup.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 

    


