class SorterMenu {
  constructor(metaData) {
    this.checked = null;
    this.validIdsSet = new Set();
    this.sortDataEvent = new CustomEvent("sort-data");

    this.allSorters = {
      date: new DateSorter(metaData),
      color: new ColorSorter(metaData),
      cluster: new ClusterSorter(metaData),
      latent: new LatentSorter(metaData),
      dateXcolor: new DateColorSorter(metaData),
    };

    const menuEl = document.getElementById("sorter-menu");
    const closeButton = document.getElementById("sorters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });

    const allRadio = menuEl.querySelectorAll("input[type='radio'][name='sorter-type']");
    allRadio.forEach(el => el.addEventListener("change", (evt) => {
      if (this.checked) {
        document.getElementById(`sorter--${this.checked}--items`).classList.add("disabled");
      }
      this.checked = evt.target.value;
      document.getElementById(`sorter--${this.checked}--items`).classList.remove("disabled");

      menuEl.dispatchEvent(this.sortDataEvent);
    }));
  }

  sort() {
    if (this.checked in this.allSorters) {
      return this.allSorters[this.checked].sort(this.validIdsSet);
    }
    return [];
  }
}
