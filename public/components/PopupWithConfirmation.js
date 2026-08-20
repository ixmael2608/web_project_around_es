import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.confirmButton = this._popupElement.querySelector(".popup__button");
    }
    setSubmitAction(action) {
        this.handleSubmitAction = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener("click", () => {
            var _a;
            (_a = this.handleSubmitAction) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
