import { Card } from "./components/Cards.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
// Buttons
const addCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
// Forms
const addCardFormElement = document.querySelector("#new-card-form");
const editProfileFormElement = document.querySelector("#edit-profile-form");
// Profile
const profileImage = document.querySelector(".profile__image");
const editProfileNameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = editProfileFormElement.querySelector(".popup__input_type_description");
const editProfileImageInput = editProfileFormElement.querySelector(".popup__input_type_profile-image");
// Form validation
const editProfileForm = new FormValidator(defaultFormConfig, editProfileFormElement);
editProfileForm.enableValidation();
const addCardForm = new FormValidator(defaultFormConfig, addCardFormElement);
addCardForm.enableValidation();
// Profile and image popup
const userInfo = new UserInfo({
    userNameSelector: ".profile__title",
    userJobSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
function createCard(cardData) {
    const card = new Card(cardData, "#card__template", (name, link) => {
        imagePopup.open(name, link);
    });
    return card.generateCard();
}
// Cards
const cardList = new Section({
    data: initialCards,
    renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
    },
}, ".cards__list");
cardList.renderItems();
const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const name = inputValues["place-name"];
    const link = inputValues.link;
    if (!name || !link) {
        return;
    }
    const newCard = {
        name,
        link,
    };
    cardList.addItem(createCard(newCard));
    addCardPopup.close();
});
addCardPopup.setEventListeners();
// Profile editing
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    const name = inputValues.name;
    const job = inputValues.description;
    const imageLink = inputValues["profile-image"];
    if (!name || !job || !imageLink) {
        return;
    }
    userInfo.setUserInfo({
        name,
        job,
    });
    profileImage.src = imageLink;
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();
// Popup opening
addCardBtn.addEventListener("click", () => {
    addCardForm.resetValidation();
    addCardPopup.open();
});
editProfileBtn.addEventListener("click", () => {
    const { name, job } = userInfo.getUserInfo();
    editProfileNameInput.value = name;
    editProfileDescriptionInput.value = job;
    editProfileImageInput.value = profileImage.src;
    editProfileForm.resetValidation();
    editProfilePopup.open();
});
