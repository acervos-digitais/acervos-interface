class SorterMenu {
  constructor(metaData) {
    this.validIdsSet = new Set();

    // TODO: instantiate sorters
    this.dateSorter = new DateSorter(
      metaData,
      "date--sorter--enable",
      "sorter-menu",
      "date--sorter-items"
    );

    this.allSorters = [
      this.dateSorter,
    ];

    const menuEl = document.getElementById("sorter-menu");
    const closeButton = document.getElementById("sorters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  sort(canvasArtWorks) {
    // TODO: sort using active sorter
    this.allSorters.forEach(s => s.sort(canvasArtWorks, this.validIdsSet));
  }
}
