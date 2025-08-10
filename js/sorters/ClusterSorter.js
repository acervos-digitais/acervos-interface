class ClusterSorter extends Sorter {
  constructor(data, enableId, menuId, itemsId) {
    super(data, enableId, menuId, itemsId);

    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    const title = document.createElement("div");
    title.innerHTML = "Selecione uma curadoria";

    this.picker = document.createElement("select");
    this.picker.classList.add("sorter--cluster-picker");
    for (let idx = 0; idx < 8; idx++) {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.innerHTML = `Cluster ${idx}`;
      this.picker.appendChild(opt);
    }
    this.picker.selectedIndex = 0

    this.picker.addEventListener("change", () => {
      this.cluster = this.picker.selectedIndex;
      this.menuEl.dispatchEvent(this.sortDataEvent);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(this.picker);
    this.itemsEl.appendChild(wrapper);

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
      distances: this.data[8].images[id].distances,
    }));

    return idDistances.toSorted(this.byClusterDist(this.cluster)).map(({ id, distances }) => ({
      id: id,
      distance: distances[this.cluster]
    }));
  }
}
