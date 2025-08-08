class FilterMenu {
  constructor(menuData) {
    this.collectionFilter = new CollectionFilter(
      menuData.collections,
      "filter-menu",
      "collection--filter--items"
    );

    this.categoryFilter = new CategoryFilter(
      menuData.categories,
      "filter-menu",
      "category--filter--items"
    );

    this.dateFilter = new DateFilter(
      menuData.dates,
      "filter-menu",
      "date--filter--items"
    );

    this.clusterFilter = new ClusterFilter(
      menuData.clusters,
      "filter-menu",
      "cluster--filter--items"
    );

    this.objectFilter = new ObjectFilter(
      menuData.objects,
      "filter-menu",
      "object--filter--items"
    );

    this.simpleFilters = [
      this.collectionFilter,
      this.categoryFilter,
      this.clusterFilter,
      this.objectFilter
    ];

    const menuEl = document.getElementById("filter-menu");
    const closeButton = document.getElementById("filters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  filter(inIdsSet, updateDateRange) {
    const simpleIdsSet = this.simpleFilters.reduce((acc, f) => f.filter(acc), inIdsSet);

    if (updateDateRange) {
      this.dateFilter.updateLimits(simpleIdsSet);
    }

    const validIdsSet = this.dateFilter.filter(simpleIdsSet);

    return Array.from(validIdsSet);
  }
}
