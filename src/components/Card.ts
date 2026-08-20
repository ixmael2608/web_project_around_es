export interface CardFormData {
  name: string;
  link: string;
}

export interface CardDataApi extends CardFormData {
  _id: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

type DeleteHandler = (cardId: string, cardElement: HTMLElement) => void;
type LikeHandler = (cardId: string, isLiked: boolean) => void;

export class Card {
  private _data: CardDataApi;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _handleDelete: DeleteHandler;
  private _handleLike: LikeHandler;
  private _currentUserId: string;
  private _likeButton?: HTMLButtonElement;

  constructor(
    data: CardDataApi,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDelete: DeleteHandler,
    handleLike: LikeHandler,
    currentUserId: string
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._currentUserId = currentUserId;
  }

  private getTemplate(): HTMLElement {
    const template = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    return template.content.querySelector(".card")!.cloneNode(true) as HTMLElement;
  }

  private setEventListeners(cardElement: HTMLElement): void {
    const image = cardElement.querySelector(".card__image") as HTMLImageElement;
    const likeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    const deleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;

    image.addEventListener("click", () => this._handleCardClick(this._data.name, this._data.link));
    likeButton.addEventListener("click", () => this._handleLike(this._data._id, !this._data.isLiked));
    deleteButton.addEventListener("click", () => this._handleDelete(this._data._id, cardElement));
  }

  createCard(): HTMLElement {
    const cardElement = this.getTemplate();
    const title = cardElement.querySelector(".card__title") as HTMLElement;
    const image = cardElement.querySelector(".card__image") as HTMLImageElement;
    const likeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    const deleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;

    title.textContent = this._data.name;
    image.src = this._data.link;
    image.alt = this._data.name;
    this._likeButton = likeButton;
    likeButton.classList.toggle("card__like-button_is-active", this._data.isLiked);
    deleteButton.style.display = this._data.owner === this._currentUserId ? "block" : "none";
    this.setEventListeners(cardElement);
    return cardElement;
  }

  updateLikeStatus(isLiked: boolean): void {
    this._data.isLiked = isLiked;
    this._likeButton?.classList.toggle("card__like-button_is-active", isLiked);
  }
}
