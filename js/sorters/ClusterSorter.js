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

  sort(canvasArtWorks, validIdsSet) {
    if (!this.enableEl.checked) return;

    const numColumns = parseInt(Math.sqrt(validIdsSet.size));

    const id2distances = Array.from(validIdsSet).map(id => ({
      id: id,
      distances: this.data[8].images[id].distances,
    }));

    const id2Order = id2distances.toSorted(this.byClusterDist(this.cluster)).reduce((acc, id, idx) => {
      acc[`${id}`] = idx;
      return acc;
    }, {});

    const W = 50;
    for (const artWork of canvasArtWorks) {
      if (!validIdsSet.has(`${artWork.id}`)) {
        artWork.a = 0;
        artWork.x = 0;
        artWork.y = 0;
      } else {
        artWork.a = 1;
        artWork.w = W;
        artWork.h = W;

        artWork.x = (id2Order[`${artWork.id}`] % numColumns) * W;
        artWork.y = (id2Order[`${artWork.id}`] / numColumns) * W;
      }
    }
  }
}
