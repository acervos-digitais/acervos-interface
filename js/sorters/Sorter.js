class Sorter {
  constructor(data, enableId, menuId, itemsId) {
    this.enableEl = document.getElementById(enableId);
    this.menuEl = document.getElementById(menuId);
    this.itemsEl = document.getElementById(itemsId);

    this.data = data;

    this.sortDataEvent = new CustomEvent("sort-data");
  }
}
