import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    private confirmButton: HTMLButtonElement;
    private handleSubmitAction!: () => void

    constructor(popupSelector: string) {
        super(popupSelector)
        this.confirmButton = this._popupElement.querySelector(".popup__button") as HTMLButtonElement
    }

    public setSubmitAction(action: () => void) {
        this.handleSubmitAction = action
    }

    public override setEventListeners(): void {
        super.setEventListeners()
        this.confirmButton.addEventListener("click", () => {
            this.handleSubmitAction?.()
        })
    }
}