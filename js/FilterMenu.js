class FilterMenu {
  constructor(menuData) {
    this.collectionFilter = new CollectionFilter(
      menuData.collections,
      "filters--menu",
      "collection--filter--enable",
      "collection--filter--items"
    );

    this.categoryFilter = new CategoryFilter(
      menuData.categories,
      "filters--menu",
      "category--filter--enable",
      "category--filter--items"
    );

    this.dateFilter = new DateFilter(
      menuData.dates,
      "filters--menu",
      "date--filter--enable",
      "date--filter--items"
    );

    this.clusterFilter = new ClusterFilter(
      menuData.clusters,
      "filters--menu",
      "cluster--filter--enable",
      "cluster--filter--items"
    );

    this.objectFilter = new ObjectFilter(
      menuData.objects,
      "filters--menu",
      "object--filter--enable",
      "object--filter--items"
    )

    const menuEl = document.getElementById("filters--menu");
    const closeButton = document.getElementById("filters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  filter(inputIdxsSet) {

  }
}
