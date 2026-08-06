export class Popup {
    constructor(popupSelector) {
        this.handleEscClose = (event) => {
            const escKey = event.key === "Escape";
            const popup = document.querySelector(".popup_is-opened");
            if (escKey && popup) {
                this.close();
            }
        };
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector(".popup__close");
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        this._closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popupElement.addEventListener("click", (event) => {
            if (event.target === this._popupElement) {
                this.close();
            }
        });
    }
}
