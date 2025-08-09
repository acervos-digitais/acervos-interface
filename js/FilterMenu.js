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

    this.allFilters = [
      this.collectionFilter,
      this.categoryFilter,
      this.dateFilter,
      this.clusterFilter,
      this.objectFilter
    ];

    const menuEl = document.getElementById("filter-menu");
    const closeButton = document.getElementById("filters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  filter(inIdsSet) {
    const validIdsSet = this.allFilters.reduce((acc, f) => f.filter(acc), inIdsSet);

    return validIdsSet;
  }
}
