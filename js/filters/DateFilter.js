class DateFilter extends Filter {
  constructor(data, menuId, itemsId) {
    super(data, menuId, itemsId);

    this.evtOpt = { detail: { fromDate: true } };
    this.filterDataEvent = new CustomEvent("filter-data", this.evtOpt);

    const minEl = document.createElement("input");
    minEl.type = "number";
    minEl.value = data.min;
    minEl.min = data.min;
    minEl.max = data.max;

    const maxEl = document.createElement("input");
    maxEl.type = "number";
    maxEl.value = data.max;
    maxEl.min = data.min;
    maxEl.max = data.max;

    minEl.addEventListener("change", () => this.menuEl.dispatchEvent(this.filterDataEvent));
    maxEl.addEventListener("change", () => this.menuEl.dispatchEvent(this.filterDataEvent));

    this.itemsEl.appendChild(minEl);
    this.itemsEl.appendChild(maxEl);
  }

  update(inputIds) {
    // TODO: update min-min and max-max
  }

  filter(inputIds) {
    // TODO: filter based on min/max
  }
}
