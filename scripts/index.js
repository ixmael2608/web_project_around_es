const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },

  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },

  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },

  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Botones
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Modales (popups)
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector("#image-popup");

const editCloseButton = editPopup.querySelector(".popup__close");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const imageCloseButton = imagePopup.querySelector(".popup__close");

const formEdit = document.querySelector("#edit-profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

// Elementos del perfil
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".cards__list");

// Abrir modal
function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener(`keydown`, handleEscKey);
}

// Cerrar modal
function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener(`keydown`, handleEscKey);
}

function handleOverlayClick(event, modalElement) {
  if (event.target === modalElement) closeModal(modalElement);
}

function handleEscKey(event) {
  if (event.key === `Escape`) {
    const openPopup = document.querySelector(`.popup_is-opened`);
    if (openPopup) closeModal(openPopup);
  }
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(formEdit, validationConfig);
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (formEdit.checkValidity()) {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editPopup);
  }
}

// Apariencia del boton Like
function handleLikeButton(likeButton) {
  likeButton.classList.toggle(`card__like-button_is-active`);
}

//Hanlder de eliminacion de tarjeta del DOM
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

//Apertura de modal en imagen
function handleImageClick(link, name) {
  const popupImage = imagePopup.querySelector(`.popup__image`);
  const popupCaption = imagePopup.querySelector(`.popup__caption`);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function getCardElement(cardData) {
  const {
    name = "Titulo",
    link = "https://via.placeholder.com/300x200?text=Imagen+no+disponible",
  } = cardData;
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener(`click`, () => handleLikeButton(likeButton));
  deleteButton.addEventListener(`click`, () => handleDeleteCard(cardElement));
  cardImage.addEventListener(`click`, () => handleImageClick(link, name));

  return cardElement;
}

// Funcion para renderizar una tarjeta
function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

function renderCards() {
  initialCards.forEach((card) => renderCard(card.name, card.link, cardsList));
}

const newCardForm = document.querySelector(`#new-card-form`);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const placeName = document.querySelector(`#card-name`);
  const linkUrl = document.querySelector(`#card-url`);
  if (newCardForm.checkValidity()) {
    renderCard(placeName.value, linkUrl.value, cardsList);
    evt.target.reset();
    resetValidation(newCardForm, validationConfig);
    closeModal(newCardPopup);
  }
}

// ========== EVENT LISTENERS ==========

editButton.addEventListener("click", handleOpenEditModal);

editCloseButton.addEventListener("click", () => {
  closeModal(editPopup);
});

addButton.addEventListener("click", () => {
  newCardForm.reset();
  resetValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardPopup);
});

imageCloseButton.addEventListener(`click`, () => closeModal(imagePopup));

editPopup.addEventListener(`click`, (e) => handleOverlayClick(e, editPopup));
newCardPopup.addEventListener(`click`, (e) =>
  handleOverlayClick(e, newCardPopup),
);
imagePopup.addEventListener(`click`, (e) => handleOverlayClick(e, imagePopup));

newCardForm.addEventListener(`submit`, handleCardFormSubmit);
formEdit.addEventListener(`submit`, handleProfileFormSubmit);

const validationConfig = {
  formSelector: `.popup__form`,
  inputSelector: `.popup__input`,
  submitButtonSelector: `.popup__button`,
  inactiveButtonClass: `popup__button_inactive`,
  inputErrorClass: `popup__input_type_error`,
  errorClass: `popup__input-error_active`,
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

function resetValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

enableValidation(validationConfig);

renderCards();
