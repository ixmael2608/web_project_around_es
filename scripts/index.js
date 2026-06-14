const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald_mountains.jpg",
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

initialCards.forEach(function (card) {
  console.log(card);
});


const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",

  const editProfileValidator = new FormValidator(validationConfig, formElement);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

const inputCardName = newCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = newCardForm.querySelector(".popup__input_type_url");

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
  api
    .setUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    })
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        description: data.about,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function createCard(item) {
  const card = new Card(item, "#card__template", (name, link) => {
    imagePopup.open(name, link);
  });

  const cardElement = card.getView();
  cardSection.addItem(cardElement);
}

function showInputError(form, input) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
  errorElement.textContent = "";
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(inputs, button) {
  const isFormValid = inputs.every((input) => input.validity.valid);

  if (isFormValid) {
    button.disabled = false;
    button.classList.remove("popup__button_disabled");
  } else {
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  }
}

function resetValidation(form, inputs, button) {
  inputs.forEach((input) => {
    hideInputError(form, input);
  });

  button.disabled = true;
  button.classList.add("popup__button_disabled");
}

const cardSection = new Section(
  {
    renderer: createCard,
  },
  ".cards__list",
);