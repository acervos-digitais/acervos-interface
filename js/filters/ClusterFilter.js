import { Filter } from "./Filter.js";

class ClusterFilter extends Filter {
  constructor(data) {
    super(data, "cluster");

    for (let clusterIdx = 0; clusterIdx < data.labels.length; clusterIdx++) {
      this.createInput("checkbox", `cluster--${clusterIdx}--radio`, clusterIdx, data.labels[clusterIdx].split(",")[0]);
    }
  }

  filter(inIdsSet) {
    const selectedVals = this.inputs.filter(el => el.checked).map(x => parseInt(x.value));

    if (selectedVals.length < 1) {
      return inIdsSet;
    }

    const selectedIdsSet = selectedVals.reduce((acc, val) => acc.union(new Set(this.data.ids[val])), new Set());
    return inIdsSet.intersection(selectedIdsSet);
  }
}

export { ClusterFilter };
