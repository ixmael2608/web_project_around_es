var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";
import { Api } from "./components/API.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1/",
    headers: {
        authorization: "97e8d498-8be1-41f0-83bb-6603131aeed5",
        "Content-Type": "application/json"
    }
});
let currentUserId;
const editProfileForm = document.querySelector("#edit-profile-form");
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
const newCardForm = document.querySelector("#new-card-form");
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarForm = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
const userInfo = new UserInfo({
    userNameSelector: ".profile__title",
    userJobSelector: ".profile__description",
    avatarSelector: ".profile__image"
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const handleCardClick = (name, link) => {
    imagePopup.open(name, link);
};
const createCard = (cardData) => {
    const card = new Card(cardData, "#card__template", handleCardClick, (cardId, cardElement) => {
        deleteCardPopup.setSubmitAction(() => {
            void (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield api.deleteCard(cardId);
                    cardElement.remove();
                    deleteCardPopup.close();
                }
                catch (err) {
                    console.error("Error al eliminar la tarjeta:", err);
                }
            }))();
        });
        deleteCardPopup.open();
    }, (cardId, isLiked) => {
        void (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const updatedCard = yield api.changeLikeCardStatus(cardId, isLiked);
                card.updateLikeStatus(updatedCard.isLiked);
            }
            catch (err) {
                console.error("Error al actualizar Like:", err);
            }
        }))();
    }, currentUserId);
    return card.createCard();
};
const cardSection = new Section({
    items: [],
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [userData, serverCards] = yield Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ]);
        currentUserId = userData._id;
        userInfo.setUserInfo({
            name: userData.name,
            job: userData.about,
            avatar: userData.avatar
        });
        cardSection.renderItems(serverCards);
    }
    catch (err) {
        console.error("Fallo al cargar los datos iniciales:", err);
    }
});
init();
const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            editProfilePopup.renderLoading(true);
            const updateUserData = yield api.editUserInfo({
                name: (_a = data.name) !== null && _a !== void 0 ? _a : "",
                about: (_b = data.description) !== null && _b !== void 0 ? _b : "",
            });
            userInfo.setUserInfo({
                name: updateUserData.name,
                job: updateUserData.about,
                avatar: updateUserData.avatar
            });
            editProfilePopup.close();
        }
        catch (err) {
            console.error("Error al actualizar el perfil:", err);
        }
        finally {
            editProfilePopup.renderLoading(false);
        }
    }))();
});
editProfilePopup.setEventListeners();
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    const editProfileFormElement = document.querySelector("#edit-profile-form");
    const nameInput = editProfileFormElement.querySelector("#name-input");
    const descriptionInput = editProfileFormElement.querySelector("#description-input");
    nameInput.value = userData.name;
    descriptionInput.value = userData.job;
    editProfilePopup.open();
    editProfileFormValidator.resetValidation();
});
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            newCardPopup.renderLoading(true);
            const newCardData = yield api.addCard({
                name: (_a = data["place-name"]) !== null && _a !== void 0 ? _a : "",
                link: (_b = data.link) !== null && _b !== void 0 ? _b : ""
            });
            const cardElement = createCard(newCardData);
            cardSection.addItem(cardElement);
            newCardPopup.close();
        }
        catch (err) {
            console.error("Error al crear la nueva tarjeta:", err);
        }
        finally {
            newCardPopup.renderLoading(false);
        }
    }))();
});
newCardPopup.setEventListeners();
const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});
const deleteCardPopup = new PopupWithConfirmation("#delete-popup");
deleteCardPopup.setEventListeners();
const editAvatarPopup = new PopupWithForm("#avatar-popup", (data) => {
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            editAvatarPopup.renderLoading(true);
            const updatedUserData = yield api.updateAvatar({
                avatar: (_a = data.avatar) !== null && _a !== void 0 ? _a : ""
            });
            userInfo.setUserInfo({
                name: updatedUserData.name,
                job: updatedUserData.about,
                avatar: updatedUserData.avatar
            });
            editAvatarPopup.close();
        }
        catch (err) {
            console.error("Error al actualizar el avatar:", err);
        }
        finally {
            editAvatarPopup.renderLoading(false);
        }
    }))();
});
editAvatarPopup.setEventListeners();
const avatarEditButton = document.querySelector(".profile__avatar-button");
avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    editAvatarPopup.open();
});
