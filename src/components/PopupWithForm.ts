import { Popup } from "./Popup.js";

type FormSubmitHandler = (inputValues: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleSubmitForm: FormSubmitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = Array.from(this._popupElement.querySelectorAll(".popup__input")) as HTMLInputElement[];
    this._handleFormSubmit = handleSubmitForm;
  }

  private getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners(): void {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  }

  close(): void {
    super.close();
    this._formElement.reset();
  }
}
