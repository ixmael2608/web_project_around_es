interface SectionRenderer<T> {
  data: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor({ data, renderer }: SectionRenderer<T>, containerSelector: string) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector) as HTMLElement;
  }

  renderItems(): void {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}
