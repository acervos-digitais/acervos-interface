import { Filter } from "./Filter.js";

class ObjectFilter extends Filter {
  constructor(data) {
    super(data, "object");

    const labelOrder = {
      bird: 0,
      dog: 1,
      horse: 2,
      ox: 3,

      bush: 100,
      flower: 101,
      fruit: 102,
      grass: 103,
      greenery: 104,
      shrub: 105,
      tree: 106,
      vegetation: 107,
      conifer: 108,
      "palm tree": 109,

      "painting of human": 200,
      "human face": 201,
      "human hand": 202,
      "naked human back": 203,
      "naked human breast": 204,
      "naked human buttocks": 205,
      "naked human torso": 206,
    };
    const orderedLabels = Object.keys(data).toSorted((a, b) => labelOrder[a] - labelOrder[b]);

    for (const obj of orderedLabels) {
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
