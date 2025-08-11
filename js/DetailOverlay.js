class DetailOverlay {
  constructor(metaData) {
    this.data = Object.values(metaData).map(x => {
      const { id, creator, museum, objects, title, url, year } = x;
      return { id, creator, museum, objects, title, url, year };
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});

    const detailOverlayEl = document.getElementById("overlay--window--detail");
    detailOverlayEl.addEventListener("show-art", (evt) => this.populateOverlay(this.data[evt.detail.id]));
  }

  populateOverlay(data) {
    console.log(data);
  }
}
