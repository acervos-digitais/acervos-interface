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
    const closeButton = document.getElementById("filters--close--button");
    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  filter(inIdsSet) {
    return this.allFilters.reduce((acc, f) => f.filter(acc), inIdsSet);
  }
}
