import { Filter } from "./Filter.js";

class ClusterFilter extends Filter {
  constructor(data) {
    super(data, "cluster");

    this.picker = document.getElementById("other--cluster-picker");
    this.cluster = -1;

    const opt = document.createElement("option");
    opt.value = -1;
    opt.innerHTML = `todas`;
    this.picker.appendChild(opt);

    for (let clusterIdx = 0; clusterIdx < data.labels.length; clusterIdx++) {
      const opt = document.createElement("option");
      opt.value = clusterIdx;
      opt.innerHTML = `${data.labels[clusterIdx].split(",")[0]}`;
      this.picker.appendChild(opt);
    }

    this.picker.addEventListener("change", () => {
      this.cluster = this.picker.value;
      this.inputs.forEach(el => el.checked = false);
      this.checkCollections();
      document.dispatchEvent(this.filterDataEvent);
    });
  }

  filter(inIdsSet) {
    if (this.cluster > -1) {
      const selectedIdsSet = new Set(this.data.ids[this.cluster]);
      return inIdsSet.intersection(selectedIdsSet);
    } else {
      return inIdsSet;
    }
  }
}

export { ClusterFilter };
