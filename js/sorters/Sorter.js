class Sorter {
  constructor(data, slug) {
    this.enableEl = document.getElementById(`sorter--${slug}--enable`);
    this.itemsEl = document.getElementById(`sorter--${slug}--items`);
    this.menuEl = document.getElementById("sorter-menu");

    this.data = data;

    this.sortDataEvent = new CustomEvent("sort-data");
  }
}
