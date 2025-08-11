class ArtWork {
  static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/100";
  // static IMG_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/100";

  constructor(id, ratio) {
    const mEl = document.createElement("div");
    mEl.classList.add("art--work");
    mEl.style.width = "50px";
    mEl.style.aspectRatio = 1 / ratio;
    mEl.dataset.id = id;
    mEl.dataset.src = `${ArtWork.IMG_URL}/${id}.jpg`;

    const imgEl = document.createElement("img");

    mEl.addEventListener("click", () => {
      const detailOverlayEl = document.getElementById("overlay--window--detail");
      const evtOpt = { detail: { id: `${id}` } };
      detailOverlayEl.dispatchEvent(new CustomEvent("show-art", evtOpt));
    });

    mEl.appendChild(imgEl);
    return mEl;
  }
}

class Canvas {
  constructor(metaData) {
    this.sorted = [];

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let mEl = entry.target;
          mEl.querySelector("img").setAttribute("src", mEl.dataset.src);
          imageObserver.unobserve(mEl);
        }
      });
    });

    this.allArtWorks = Object.values(metaData).map(x => {
      const mEl = new ArtWork(x.id, x.image.ratio);
      imageObserver.observe(mEl);
      return mEl;
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});

    // TODO: instantiate Drawers
    this.allDrawers = {
      date: new DateDrawer(),
      // color: this.colorDrawer,
      // cluster: this.clusterDrawer,
      // latent: this.latentDrawer,
      // dateXcolor: this.dateXcolorDrawer
    };
  }

  draw(checked) {
    if (checked in this.allDrawers) {
      this.allDrawers[checked].draw(this.allArtWorks, this.sorted);
    }
  }
}
