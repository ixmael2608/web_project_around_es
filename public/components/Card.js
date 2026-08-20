export class Card {
    constructor(data, templateSelector, handleCardClick, handleDelete, handleLike, currentUserId) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike;
        this._currentUserId = currentUserId;
    }
    getTemplate() {
        const template = document.querySelector(this._templateSelector);
        return template.content.querySelector(".card").cloneNode(true);
    }
    setEventListeners(cardElement) {
        const image = cardElement.querySelector(".card__image");
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        image.addEventListener("click", () => this._handleCardClick(this._data.name, this._data.link));
        likeButton.addEventListener("click", () => this._handleLike(this._data._id, !this._data.isLiked));
        deleteButton.addEventListener("click", () => this._handleDelete(this._data._id, cardElement));
    }
    createCard() {
        const cardElement = this.getTemplate();
        const title = cardElement.querySelector(".card__title");
        const image = cardElement.querySelector(".card__image");
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        title.textContent = this._data.name;
        image.src = this._data.link;
        image.alt = this._data.name;
        this._likeButton = likeButton;
        likeButton.classList.toggle("card__like-button_is-active", this._data.isLiked);
        deleteButton.style.display = this._data.owner === this._currentUserId ? "block" : "none";
        this.setEventListeners(cardElement);
        return cardElement;
    }
    updateLikeStatus(isLiked) {
        var _a;
        this._data.isLiked = isLiked;
        (_a = this._likeButton) === null || _a === void 0 ? void 0 : _a.classList.toggle("card__like-button_is-active", isLiked);
    }
}
