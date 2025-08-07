class Filter {
  constructor(data, menuId, enabledId, itemsId) {
    this.menuEl = document.getElementById(menuId);
    this.enabledEl = document.getElementById(enabledId);
    this.itemsEl = document.getElementById(itemsId);

    this.data = data;
    this.boxes = [];
    this.evtOpt = { detail: { fromDate: false } };
    this.filterDataEvent = new CustomEvent("filter-data", this.evtOpt);

    this.enabledEl.addEventListener("change", () => {
      if (this.enabledEl.checked) {
        this.itemsEl.classList.remove("disabled");
      } else {
        this.itemsEl.classList.add("disabled");
        for (const b of this.boxes) {
          b.checked = false;
        }
      }
      this.menuEl.dispatchEvent(new CustomEvent("filter-data", { detail: { fromDate: false } }));
    });
  }

  filter(inputIdsSet) {
    if (!this.enabledEl.checked) {
      return inputIdsSet;
    }

    // TODO: filter Ids
  }
}
