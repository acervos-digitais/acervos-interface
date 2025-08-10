class LatentSorter extends Sorter {
  constructor(data) {
    super(data, "latent");
  }

  static norm(v, minV, maxV) {
    return (v - minV) / (maxV - minV);
  }

  sort(validIdsSet) {
    if (!this.enableEl.checked) return;

    const idXY = Array.from(validIdsSet).map(id => ({
      id: id,
      x: this.data[id].embeddings.tsne2d[0],
      y: this.data[id].embeddings.tsne2d[1],
    }));

    const allXs = idXY.map(v => v.x);
    const allYs = idXY.map(v => v.y);

    const minX = Math.min(...allXs);
    const maxX = Math.max(...allXs);
    const minY = Math.min(...allYs);
    const maxY = Math.max(...allYs);

    return idXY.map(({ id, x, y }) => ({
      id: id,
      x: LatentSorter.norm(x, minX, maxX),
      y: LatentSorter.norm(y, minY, maxY)
    }));
  }
}
