import { Filter } from "./Filter.js";

class CategoryFilter extends Filter {
  constructor(data) {
    super(data, "category");

    for (const cat of Object.keys(data)) {
      const labelSlug = cat.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, cat, cat);
    }
  }

  filter(inIdsSet) {
    const selectedVals = this.inputs.filter(el => el.checked).map(el => el.value);

    if (selectedVals.length < 1) {
      return inIdsSet;
    }

    const selectedIdsSet = selectedVals.reduce((acc, val) => acc.union(new Set(this.data[val])), new Set());
    return inIdsSet.intersection(selectedIdsSet);
  }
}

export { CategoryFilter };
