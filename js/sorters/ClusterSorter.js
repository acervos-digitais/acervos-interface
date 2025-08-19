import { Sorter } from "./Sorter.js";

class ClusterSorter extends Sorter {
  constructor(data, labels) {
    super(data, "cluster");

    this.picker = document.getElementById("cluster--sorter--cluster-picker");

    for (let idx = 0; idx < labels.length; idx++) {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.innerHTML = `${labels[idx].split(",")[0]}`;
      this.picker.appendChild(opt);
    }
    this.picker.selectedIndex = 0

    this.picker.addEventListener("change", () => {
      this.cluster = this.picker.selectedIndex;
      document.dispatchEvent(this.sortDataEvent);
    });

    this.cluster = this.picker.selectedIndex;
  }

  byClusterDist(clusterIdx) {
    const compareDist = (a, b) => {
      const aDist = a.distances[clusterIdx];
      const bDist = b.distances[clusterIdx];
      return aDist - bDist;
    };
    return compareDist;
  }

  sort(validIdsSet) {
    if (!this.enableEl.checked) return;

    const idDistances = Array.from(validIdsSet).map(id => ({
      id: id,
      distances: this.data[id].cluster.distances,
    }));

    return idDistances.toSorted(this.byClusterDist(this.cluster)).map(({ id, distances }) => ({
      id: id,
      distance: distances[this.cluster]
    }));
  }
}

export { ClusterSorter };
