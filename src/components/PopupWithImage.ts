import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private _imageElement: HTMLImageElement;
  private _descriptionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image") as HTMLImageElement;
    this._descriptionElement = this._popupElement.querySelector(".popup__caption") as HTMLElement;
  }

  open(name?: string, link?: string): void {
    if (!name || !link) {
      return;
    }

    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._descriptionElement.textContent = name;

    super.open();
  }
}
