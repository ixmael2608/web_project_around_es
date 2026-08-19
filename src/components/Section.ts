interface SectionRenderer<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor({ items, renderer }: SectionRenderer<T>, containerSelector: string) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector) as HTMLElement;
  }

  renderItems(items: T[] = this._items): void {
    items.forEach((item) => this._renderer(item));
  }

  addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}
