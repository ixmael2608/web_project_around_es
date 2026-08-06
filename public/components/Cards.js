export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    handleLikeButton(likeButton) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    handleDeleteButton(cardElement) {
        cardElement.remove();
    }
    setEventListeners(cardElement) {
        const cardImage = cardElement.querySelector(".card__image");
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
        likeButton.addEventListener("click", () => {
            this.handleLikeButton(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this.handleDeleteButton(cardElement);
        });
    }
    generateCard() {
        const cardElement = this.getTemplate();
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        cardTitle.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this.setEventListeners(cardElement);
        return cardElement;
    }
}
