export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = formElement.querySelector(config.buttonSubmitSelector);
    }
    hasInvalidInput() {
        return this._inputList.some(input => !input.validity.valid);
    }
    showInputError(inputElement, errorMessage) {
        const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.errorInputClass);
        inputErrorElement.textContent = errorMessage;
        inputErrorElement.title = errorMessage;
        inputErrorElement.classList.add(this._config.visibleError);
    }
    hideInputError(inputElement) {
        const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.errorInputClass);
        inputErrorElement.classList.remove(this._config.visibleError);
        inputErrorElement.textContent = "";
        inputErrorElement.title = "";
    }
    toggleButtonState() {
        const hasInvalid = this.hasInvalidInput();
        if (hasInvalid) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        }
        else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
        this._buttonElement.disabled = hasInvalid;
    }
    resetValidation() {
        this._inputList.forEach(input => {
            this.hideInputError(input);
        });
        this.toggleButtonState();
    }
    enableValidation() {
        this._inputList.forEach(input => {
            input.addEventListener("input", () => {
                if (!input.validity.valid) {
                    this.showInputError(input, input.validationMessage);
                }
                else {
                    this.hideInputError(input);
                }
                this.toggleButtonState();
            });
        });
        this.toggleButtonState();
    }
}
