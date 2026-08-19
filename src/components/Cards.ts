export interface CardData {
  name: string;
  link: string;
}

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;

  constructor(data: CardData, templateSelector: string, handleCardClick: (name: string, link: string) => void) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    const cardElement = cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private handleLikeButton(likeButton: HTMLButtonElement) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  private handleDeleteButton(cardElement: HTMLElement) {
    cardElement.remove();
  }

  private setEventListeners(cardElement: HTMLElement) {
    const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;
    const likeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    const deleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;

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

  generateCard(): HTMLElement {
    const cardElement = this.getTemplate();
    const cardTitle = cardElement.querySelector(".card__title") as HTMLElement;
    const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this.setEventListeners(cardElement);

    return cardElement;
  }

}
