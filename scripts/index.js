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

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const editPopup = document.querySelector("#edit-popup");
  const editButton = document.querySelector(".profile__edit-button");
  const closeButton = editPopup.querySelector(".popup__close");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const descriptionInput = document.querySelector(
    ".popup__input_type_description",
  );
  const editProfileForm = document.querySelector("#edit-profile-form");

  const cardsContainer = document.querySelector(".cards__list");
  const cardTemplate = document.querySelector("#card-template").content;

  const addCardPopup = document.querySelector("#new-card-popup");
  const addButton = document.querySelector(".profile__add-button");
  const closeAddCardButton = addCardPopup.querySelector(".popup__close");
  const newCardForm = document.querySelector("#new-card-form");
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_url");

  const imagePopup = document.querySelector("#image-popup");
  const popupImageElement = imagePopup.querySelector(".popup__image");
  const popupCaptionElement = imagePopup.querySelector(".popup__caption");
  const closeImagePopupButton = imagePopup.querySelector(".popup__close");

  const popups = document.querySelectorAll(".popup");

  function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscapeClose);
  }

  function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscapeClose);
  }

  // === MANEJADORES DEL PERFIL ===
  function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  function handleOpenEditModal() {
    fillProfileForm();
    openPopup(editPopup);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(editPopup);
  }

  // === MANEJADORES DE "NUEVO LUGAR" ===
  function handleOpenAddCardModal() {
    newCardForm.reset();
    openPopup(addCardPopup);
  }

  // === MANEJADORES DE TARJETAS ===
  function handleLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  function handleDeleteButtonClick(evt) {
    const cardItem = evt.target.closest(".card");
    if (cardItem) {
      cardItem.remove();
    }
  }

  // Abre la imagen en grande
  function handleCardImageClick(name, link) {
    popupCaptionElement.textContent = name;
    popupImageElement.src = link;
    popupImageElement.alt = name;
    openPopup(imagePopup);
  }

  function getCardElement(name, link) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    likeButton.addEventListener("click", handleLikeButtonClick);
    deleteButton.addEventListener("click", handleDeleteButtonClick);

    cardImage.addEventListener("click", () => {
      handleCardImageClick(name, link);
    });

    return cardElement;
  }

  function renderCard(name, link, container) {
    const newCard = getCardElement(name, link);
    container.prepend(newCard);
  }

  function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    renderCard(name, link, cardsContainer);
    closePopup(addCardPopup);
    newCardForm.reset();
  }

  // Inicializar tarjetas en la galería
  initialCards.forEach((card) => {
    renderCard(card.name, card.link, cardsContainer);
  });

  // === DETECTORES DE EVENTOS ===
  editButton.addEventListener("click", handleOpenEditModal);
  closeButton.addEventListener("click", () => closePopup(editPopup));
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);

  addButton.addEventListener("click", handleOpenAddCardModal);
  closeAddCardButton.addEventListener("click", () => closePopup(addCardPopup));
  newCardForm.addEventListener("submit", handleCardFormSubmit);

  closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

  // Cierre de popups por overlay
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closePopup(popup);
      }
    });
  });
});
