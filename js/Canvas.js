import { BinDrawer } from "./drawers/BinDrawer.js";
import { GridDrawer } from "./drawers/GridDrawer.js";
import { XyDrawer } from "./drawers/XyDrawer.js";

class ArtWork {
  static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";
  // static IMG_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/100";

  constructor(id, ratio) {
    const mEl = document.createElement("div");
    mEl.classList.add("art--work");
    mEl.style.width = "50px";
    mEl.style.aspectRatio = 1 / ratio;
    mEl.dataset.ratio = 1 / ratio;
    mEl.dataset.id = id;
    mEl.dataset.src = `${ArtWork.IMG_URL}/${id}.jpg`;

    const imgEl = document.createElement("img");

    mEl.addEventListener("click", () => {
      const evtOpt = { detail: { id: `${id}` } };
      document.dispatchEvent(new CustomEvent("show-detail", evtOpt));
    });

    mEl.appendChild(imgEl);
    return mEl;
  }
}

class Canvas {
  constructor(metaData) {
    this.sorted = [];
    this.zoomLevel = 0;
    this.checked = null;

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let mEl = entry.target;
          setTimeout(() => mEl.querySelector("img").setAttribute("src", mEl.dataset.src), 100 + Math.random() * 1500);
          imageObserver.unobserve(mEl);
        }
      });
    });

    this.allArtWorks = Object.values(metaData).map(x => {
      const mEl = new ArtWork(x.id, x.image.ratio);
      imageObserver.observe(mEl);
      return mEl;
    }).reduce((acc, v) => {
      acc[v.dataset.id] = v;
      return acc;
    }, {});

    const binDrawer = new BinDrawer();
    const gridDrawer = new GridDrawer();
    const xyDrawer = new XyDrawer();

    this.allDrawers = {
      date: binDrawer,
      color: gridDrawer,
      latent: xyDrawer,
    };

    const containerEl = document.getElementById("canvas--container");
    containerEl.addEventListener("wheel", (evt) => {
      if (!evt.altKey) return;
      evt.preventDefault();
      this.updateScale(evt.deltaY > 0 ? -0.1 : 0.1);
    });

    const pageURL = window.location.href.replace(/^https?:\/\//, '');
    const isMobile = pageURL.includes('mobile');

    if (!isMobile) {
      const zoomLessEl = document.getElementById('zoom--less');
      const zoomMoreEl = document.getElementById('zoom--more');
      zoomLessEl.addEventListener('click', () => this.updateScale(-1));
      zoomMoreEl.addEventListener('click', () => this.updateScale(1));
    }
  }

  updateScale(delta) {
    this.zoomLevel += delta;

    const canvasDrawing = document.getElementById('canvas--drawing');
    canvasDrawing.dispatchEvent(new Event("scrollbar-update"));

    const zoomLimits = canvasDrawing.classList.contains('grid') ? { min: -16, max: 3 } : { min: -16, max: 16 };

    if (this.zoomLevel < zoomLimits.min) this.zoomLevel = zoomLimits.min;
    if (this.zoomLevel > zoomLimits.max) this.zoomLevel = zoomLimits.max;
    console.log(this.zoomLevel, delta)

    if (this.checked in this.allDrawers) {
      this.allDrawers[this.checked].zoom(this.zoomLevel);
    }
  }

  draw(checked) {
    this.checked = checked;
    if (checked in this.allDrawers) {
      if (this.sorted.length > 0) {
        document.getElementById("canvas--intro").classList.add("hidden");
      }

      this.allDrawers[checked].draw(this.allArtWorks, this.sorted, this.zoomLevel);
    }
  }
}

export { Canvas };
