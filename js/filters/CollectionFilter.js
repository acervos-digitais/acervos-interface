import { Filter } from "./Filter.js";

class CollectionFilter extends Filter {
  constructor(data) {
    super(data, "collection");

    for (const col of Object.keys(data)) {
      const labelSlug = col.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, col, col);
    }

    this.addAllNone();
  }

  filter(inIdsSet) {
    const selectedVals = this.inputs.filter(el => el.checked).map(el => el.value);

    if (selectedVals.length < 1) {
      if (window.location.href.includes("full")) {
        return inIdsSet;
      } else {
        return new Set();
      }
    }

    const selectedIdsSet = selectedVals.reduce((acc, val) => acc.union(new Set(this.data[val])), new Set());
    return inIdsSet.intersection(selectedIdsSet);
  }
}

export { CollectionFilter };
