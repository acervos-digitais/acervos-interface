import { ClusterSorter } from "./sorters/ClusterSorter.js";
import { ClusterClusterSorter } from "./sorters/ClusterClusterSorter.js";
import { ColorSorter } from "./sorters/ColorSorter.js";
import { DateSorter } from "./sorters/DateSorter.js";
import { DateColorSorter } from "./sorters/DateColorSorter.js";
import { LatentSorter } from "./sorters/LatentSorter.js";

class SorterMenu {
  constructor(metaData, menuData) {
    this.checked = null;
    this.validIdsSet = new Set();
    this.sortDataEvent = new CustomEvent("sort-data");

    this.allSorters = {
      date: new DateSorter(metaData),
      color: new ColorSorter(metaData),
      cluster: new ClusterSorter(metaData, menuData.clusters.labels),
      latent: new LatentSorter(metaData),
      dateXcolor: new DateColorSorter(metaData),
      clusterXcluster: new ClusterClusterSorter(metaData, menuData.clusters.labels),
    };

    const menuEl = document.getElementById("sorter-menu");
    const closeButton = document.getElementById("sorter--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.classList.toggle("hidden");
    });

    const aboutEl = document.getElementById("about-overlay--background");
    const aboutButtonEl = document.getElementById("menu--about--button");
    aboutButtonEl.addEventListener("click", () => aboutEl.classList.remove("hidden"));

    this.checked = menuEl.querySelector("input[name='sorter-type']:checked")?.value ?? null;

    const allRadio = menuEl.querySelectorAll("input[name='sorter-type']");
    const allColor = menuEl.querySelectorAll("input[type='color']");
    allRadio.forEach(el => el.addEventListener("change", (evt) => {
      if (this.checked) {
        document.getElementById(`sorter--${this.checked}--items`)?.classList.add("disabled");
      }

      this.checked = evt.target.value;
      document.getElementById(`sorter--${this.checked}--items`)?.classList.remove("disabled");

      allColor.forEach(el => {
        el.classList.add("hidden");
        if (el.id.split("--")[0] == this.checked) {
          el.classList.remove("hidden");
        }
      });

      document.dispatchEvent(this.sortDataEvent);
    }));
  }

  sort() {
    if (this.checked in this.allSorters) {
      return this.allSorters[this.checked].sort(this.validIdsSet);
    }
    return [];
  }
}

export { SorterMenu };
