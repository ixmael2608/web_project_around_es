import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._descriptionElement = this._popupElement.querySelector(".popup__caption");
    }
    open(name, link) {
        if (!name || !link) {
            return;
        }
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._descriptionElement.textContent = name;
        super.open();
    }
}
