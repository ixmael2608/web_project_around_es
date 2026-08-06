export interface FormConfig {
  inputSelector: string;
  buttonSubmitSelector: string;
  inactiveButtonClass: string;
  errorInputClass: string;
  visibleError: string;
}

export class FormValidator {
  private _config: FormConfig;
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _buttonElement: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector)) as HTMLInputElement[];
    this._buttonElement = formElement.querySelector(config.buttonSubmitSelector) as HTMLButtonElement;
  }

  private hasInvalidInput(): boolean {
    return this._inputList.some(input => !input.validity.valid);
  }

  private showInputError(inputElement: HTMLInputElement, errorMessage: string): void {
    const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`) as HTMLInputElement;
    inputElement.classList.add(this._config.errorInputClass);
    inputErrorElement.textContent = errorMessage;
    inputErrorElement.title = errorMessage;
    inputErrorElement.classList.add(this._config.visibleError);
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`) as HTMLInputElement;
    inputElement.classList.remove(this._config.errorInputClass);
    inputErrorElement.classList.remove(this._config.visibleError);
    inputErrorElement.textContent = "";
    inputErrorElement.title = "";
  }

  private toggleButtonState(): void {
    const hasInvalid = this.hasInvalidInput();
    if (hasInvalid) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }

    this._buttonElement.disabled = hasInvalid;
  }

  resetValidation(): void {
    this._inputList.forEach(input => {
      this.hideInputError(input);
    });

    this.toggleButtonState();
  }

  enableValidation(): void {
    this._inputList.forEach(input => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this.showInputError(input, input.validationMessage);
        } else {
          this.hideInputError(input);
        }

        this.toggleButtonState();
      });
    });

    this.toggleButtonState();
  }
}
