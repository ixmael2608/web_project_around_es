export class Popup {
  protected _popupElement: HTMLElement;
  private _closeButton: HTMLButtonElement;

  constructor(popupSelector: string) {
    this._popupElement = document.querySelector(popupSelector) as HTMLElement;
    this._closeButton = this._popupElement.querySelector(".popup__close") as HTMLButtonElement;
  }

  open(): void {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  close(): void {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  private handleEscClose = (event: KeyboardEvent) => {
    const escKey = event.key === "Escape";
    const popup = document.querySelector(".popup_is-opened");

    if (escKey && popup) {
      this.close();
    }
  }

  setEventListeners(): void {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (event: MouseEvent) => {
      if(event.target === this._popupElement) {
        this.close();
      }
    });
  }

}
