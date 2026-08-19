import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._inputList = Array.from(this._popupElement.querySelectorAll(".popup__input"));
        this._handleFormSubmit = handleSubmitForm;
    }
    getInputValues() {
        const inputValues = {};
        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
