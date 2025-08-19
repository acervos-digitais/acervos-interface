import { Sorter } from "./Sorter.js";

class ClusterClusterSorter extends Sorter {
  constructor(data, labels) {
    super(data, "clusterXcluster");

    this.pickers = {
      x: document.getElementById("clusterXcluster--sorter--x-picker"),
      y: document.getElementById("clusterXcluster--sorter--y-picker")
    };

    Object.entries(this.pickers).forEach(([k, el]) => {
      for (let idx = 0; idx < labels.length; idx++) {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.innerHTML = `${labels[idx].split(",")[0]}`;
        el.appendChild(opt);
      }
      el.selectedIndex = 0;
      el.addEventListener("change", () => {
        this.clusters[k] = el.selectedIndex;
        document.dispatchEvent(this.sortDataEvent);
      });
    });

    this.clusters = {
      x: this.pickers.x.selectedIndex,
      y: this.pickers.y.selectedIndex,
    };
  }

  static norm(v, minV, maxV) {
    return (v - minV) / (maxV - minV);
  }

  sort(validIdsSet, normalize=true) {
    if (!this.enableEl.checked) return;

    const idXY = Array.from(validIdsSet).map(id => ({
      id: id,
      x: -this.data[id].cluster.distances[this.clusters.x],
      y: this.data[id].cluster.distances[this.clusters.y],
    })).toSorted((a,b) => (a.x + a.y) - (b.x + b.y));

    if (!normalize) return idXY;

    const allXs = idXY.map(v => v.x);
    const allYs = idXY.map(v => v.y);

    const minX = Math.min(...allXs);
    const maxX = Math.max(...allXs);
    const minY = Math.min(...allYs);
    const maxY = Math.max(...allYs);

    return idXY.map(({ id, x, y }) => ({
      id: id,
      x: ClusterClusterSorter.norm(x, minX, maxX),
      y: ClusterClusterSorter.norm(y, minY, maxY)
    }));
  }
}

export { ClusterClusterSorter };
