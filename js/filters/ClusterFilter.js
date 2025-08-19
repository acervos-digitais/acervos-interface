import { Filter } from "./Filter.js";

class ClusterFilter extends Filter {
  constructor(data) {
    super(data, "cluster");

    this.otherPicker = document.getElementById("other--cluster-picker") ?? null;
    this.otherCluster = -1;

    for (let clusterIdx = 0; clusterIdx < data.labels.length; clusterIdx++) {
      const inputEl = this.createInputNoListener("checkbox", `cluster--${clusterIdx}--radio`, clusterIdx, data.labels[clusterIdx].split(",")[0]);
      inputEl.addEventListener("change", () => {
        if (this.otherPicker) {
          this.otherPicker.selectedIndex = 0;
          this.otherCluster = -1;
        }
        document.dispatchEvent(this.filterDataEvent);
      });
    }

    if (this.otherPicker) {
      const opt = document.createElement("option");
      opt.value = -1;
      opt.innerHTML = `todas`;
      this.otherPicker.appendChild(opt);

      for (let clusterIdx = 0; clusterIdx < data.labels.length; clusterIdx++) {
        const opt = document.createElement("option");
        opt.value = clusterIdx;
        opt.innerHTML = `${data.labels[clusterIdx].split(",")[0]}`;
        this.otherPicker.appendChild(opt);
      }

      this.otherPicker.addEventListener("change", () => {
        this.otherCluster = this.otherPicker.value;
        this.inputs.forEach(el => el.checked = false);
        document.dispatchEvent(this.filterDataEvent);
      });
    }
  }

  filterFilter(inIdsSet) {
    const selectedVals = this.inputs.filter(el => el.checked).map(x => parseInt(x.value));

    if (selectedVals.length < 1) {
      return inIdsSet;
    }

    const selectedIdsSet = selectedVals.reduce((acc, val) => acc.union(new Set(this.data.ids[val])), new Set());
    return inIdsSet.intersection(selectedIdsSet);
  }

  filterOther(inIdsSet) {
    if (this.otherPicker && this.otherCluster > -1) {
      const selectedIdsSet = new Set(this.data.ids[this.otherCluster]);
      return inIdsSet.intersection(selectedIdsSet);
    } else {
      return inIdsSet;
    }
  }

  filter(inIdsSet) {
    return this.filterFilter(this.filterOther(inIdsSet));
  }
}

export { ClusterFilter };
