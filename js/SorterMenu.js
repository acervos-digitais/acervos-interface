class SorterMenu {
  constructor(metaData) {
    this.checked = null;
    this.validIdsSet = new Set();
    this.sortDataEvent = new CustomEvent("sort-data");

    this.dateSorter = new DateSorter(
      metaData,
      "date--sorter--enable",
      "sorter-menu",
      "date--sorter--items"
    );

    this.allSorters = {
      date: this.dateSorter,
      // color: this.colorSorter,
      // cluster: this.clusterSorter,
      // latent: this.latentSorter,
      // dateXcolor: this.dateXcolorSorter
    };

    const menuEl = document.getElementById("sorter-menu");
    const closeButton = document.getElementById("sorters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });

    const allRadio = menuEl.querySelectorAll("input[type='radio'][name='sorter-type']");
    allRadio.forEach(el => el.addEventListener("change", (evt) => {
      if (this.checked) {
        document.getElementById(`${this.checked}--sorter--items`).classList.add("disabled");
      }
      this.checked = evt.target.value;
      document.getElementById(`${this.checked}--sorter--items`).classList.remove("disabled");

      menuEl.dispatchEvent(this.sortDataEvent)
    }));
  }

  sort(canvasArtWorks) {
    if (this.checked in this.allSorters) {
      this.allSorters[this.checked].sort(canvasArtWorks, this.validIdsSet);
    }
  }
}
