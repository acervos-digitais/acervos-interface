import { Filter } from "./Filter.js";

class DateFilter extends Filter {
  constructor(data) {
    super(data, "date");

    this.inputs = {
      minEl: this.setupRangeInput("date--filter--min", data.min),
      maxEl: this.setupRangeInput("date--filter--max", data.max),
    };
  }

  setupRangeInput(slug, value) {
    const rangeEl = document.getElementById(`${slug}--input`);
    const valueEl = document.getElementById(`${slug}--value`);

    rangeEl.min = this.data.min;
    rangeEl.max = this.data.maxAll;
    rangeEl.value = value;

    valueEl.innerHTML = `${rangeEl.value}`;

    rangeEl.addEventListener("mousemove", () => valueEl.innerHTML = rangeEl.value);
    rangeEl.addEventListener("change", () => valueEl.innerHTML = rangeEl.value);
    rangeEl.addEventListener("change", () => {
      this.checkCollections();
      document.dispatchEvent(this.filterDataEvent);
    });

    return rangeEl;
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

export { DateFilter };
