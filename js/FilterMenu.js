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
    )

    const menuEl = document.getElementById("filter-menu");
    const closeButton = document.getElementById("filters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  filter(inIdsSet, updateDateRange) {
    // TODO: reduce all except date
    //       update (or not) date range
    //       filter by date

    const catIdsSet = this.categoryFilter.filterData(inIdsSet);
    const cluIdsSet = this.clusterFilter.filterData(inIdsSet);
    const colIdsSet = this.collectionFilter.filterData(inIdsSet);
    const dateIdsSet = this.dateFilter.filterData(inIdsSet);
    const objIdsSet = this. objectFilter.filterData(inIdsSet);

    console.log(catIdsSet.size, cluIdsSet.size, colIdsSet.size, dateIdsSet.size, objIdsSet.size);
  }
}
