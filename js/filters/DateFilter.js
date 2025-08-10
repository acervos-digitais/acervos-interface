class DateFilter extends Filter {
  constructor(data) {
    super(data, "date");

    const minEl = document.createElement("input");
    const maxEl = document.createElement("input");

    minEl.type = "number";
    maxEl.type = "number";

    this.inputs = { minEl, maxEl };
    this.setLimits(data.min, data.max);

    minEl.addEventListener("change", () => this.menuEl.dispatchEvent(this.filterDataEvent));
    maxEl.addEventListener("change", () => this.menuEl.dispatchEvent(this.filterDataEvent));

    this.itemsEl.appendChild(minEl);
    this.itemsEl.appendChild(maxEl);
  }

  setLimits(minVal, maxVal) {
    this.inputs.minEl.value = minVal;
    this.inputs.minEl.min = minVal;
    this.inputs.minEl.max = this.data.maxAll;

    this.inputs.maxEl.value = maxVal;
    this.inputs.maxEl.min = minVal;
    this.inputs.maxEl.max = this.data.maxAll;
  }

  filter(inIdsSet) {
    const minVal = this.inputs.minEl.valueAsNumber;
    const maxVal = this.inputs.maxEl.valueAsNumber;
    const between = (x) => (x.year >= minVal && x.year <= maxVal);

    const selectedIds = this.data.yearsIds.filter(between).map(x => x.ids).flat();
    const selectedIdsSet = new Set(selectedIds);

    return inIdsSet.intersection(selectedIdsSet);
  }
}
