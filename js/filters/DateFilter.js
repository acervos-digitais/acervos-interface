class DateFilter extends Filter {
  constructor(data, menuId, itemsId) {
    super(data, menuId, itemsId);

    this.evtOpt = { detail: { fromDate: true } };
    this.filterDataEvent = new CustomEvent("filter-data", this.evtOpt);

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
    this.inputs.minEl.max = maxVal;

    this.inputs.maxEl.value = maxVal;
    this.inputs.maxEl.min = minVal;
    this.inputs.maxEl.max = maxVal;
  }

  getMinMax(inIdsSet) {
    const inYears = Array.from(inIdsSet).filter(x => x in this.data.idsYears).map(x => this.data.idsYears[x]);
    const inMin = Math.min(...inYears);
    const inMax = Math.max(...inYears);
    return [inMin, inMax];
  }

  update(inIdsSet) {
    const [inMin, inMax] = this.getMinMax(inIdsSet);
    this.setMinMaxValsLimits(inMin, inMax);
  }

  filterData(inIdsSet) {
    const minVal = this.inputs.minEl.valueAsNumber;
    const maxVal = this.inputs.maxEl.valueAsNumber;
    const between = (id) => (this.data.idsYears[id] >= minVal && this.data.idsYears[id] <= maxVal);

    const [inMin, inMax] = this.getMinMax(inIdsSet);
    if (minVal < inMin || maxVal > inMax) {
      return inIdsSet;
    }

    const selectedIdsSet = new Set(Object.keys(this.data.idsYears).filter(between));
    return inIdsSet.intersection(selectedIdsSet);
  }
}
