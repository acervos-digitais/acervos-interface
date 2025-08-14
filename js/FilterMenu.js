import { CategoryFilter } from "./filters/CategoryFilter.js";
import { ClusterFilter } from "./filters/ClusterFilter.js";
import { CollectionFilter } from "./filters/CollectionFilter.js";
import { DateFilter } from "./filters/DateFilter.js";
import { ObjectFilter } from "./filters/ObjectFilter.js";

class FilterMenu {
  constructor(menuData) {
    this.objectFilter = new ObjectFilter(menuData.objects);

    this.allFilters = [
      new CollectionFilter(menuData.collections),
      new CategoryFilter(menuData.categories),
      new DateFilter(menuData.dates),
      new ClusterFilter(menuData.clusters),
      this.objectFilter,
    ];

    const menuEl = document.getElementById("filter-menu");
    const closeButton = document.getElementById("filter--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.classList.toggle("hidden");
    });
  }

  filter(inIdsSet) {
    return this.allFilters.reduce((acc, f) => f.filter(acc), inIdsSet);
  }
}

export { FilterMenu };
