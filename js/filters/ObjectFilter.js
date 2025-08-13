import { Filter } from "./Filter.js";

class ObjectFilter extends Filter {
  constructor(data) {
    super(data, "object");

    for (const obj of Object.keys(data)) {
      const labelSlug = obj.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, obj, obj);
    }

    this.selectedVals = [];
  }

  filter(inIdsSet) {
    this.selectedVals = this.inputs.filter(el => el.checked).map(el => el.value);

    if (this.selectedVals.length < 1) {
      return inIdsSet;
    }

    const selectedIdsSet = this.selectedVals.reduce((acc, val) => acc.union(new Set(this.data[val])), new Set());
    return inIdsSet.intersection(selectedIdsSet);
  }
}

export { ObjectFilter };
