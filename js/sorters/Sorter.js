class Sorter {
  constructor(data, slug) {
    this.enableEl = document.getElementById(`sorter--${slug}--enable`);
    this.itemsEl = document.getElementById(`sorter--${slug}--items`);

    this.data = data;

    this.sortDataEvent = new CustomEvent("sort-data");
  }
}

export { Sorter };
