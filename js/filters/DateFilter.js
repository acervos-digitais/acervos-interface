class DateFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

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

    const evtOpt = { detail: { fromDate: true } };
    minEl.addEventListener("change", () => this.menuEl.dispatchEvent(new CustomEvent("filter-data", evtOpt)));
    maxEl.addEventListener("change", () => this.menuEl.dispatchEvent(new CustomEvent("filter-data", evtOpt)));

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
