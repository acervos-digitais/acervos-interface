import { getLabel } from "../label_strings.js";
import { Overlay } from "./Overlay.js";

class DetailOverlay extends Overlay {
  // static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";
  static IMG_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/500";

  constructor(metaData) {
    super("detail");

    this.data = Object.values(metaData).map(x => {
      const { id, color_palette, creator, museum, objects, title, url, year } = x;
      return { id, color_palette, creator, museum, objects, title, url, year };
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});

    this.loaderEl = document.getElementById("detail-overlay--loader");
    this.imgEl = document.getElementById("detail-overlay--image");
    this.boxesEl = document.getElementById("detail-overlay--boxes");
    this.colorsEl = document.getElementById("detail-overlay--colors");

    this.titleEl = document.getElementById("detail-overlay--title--text");
    this.collectionEl = document.getElementById("detail-overlay--collection--text");
    this.linkEl = document.getElementById("detail-overlay--info--link");
    this.listEl = document.getElementById("detail-overlay--list--link");
    this.aiTextEl = document.getElementById("detail-overlay--info--subtext");

    this.listEl.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("show-results"));
    });
  }

  populateDetailOverlay(id, objects) {
    const data = this.data[id];

    const titleText = data.title == "" ? "untitled" : `${data.title}`;
    const yearText = (data.year > this.nowYear) ? "undated" : `${data.year}`;
    const creatorText = data.creator.includes("http") || data.creator.includes("known") || data.creator.includes("ão identificado") || data.creator == "" ? "unauthored" : `${data.creator}`;

    this.listEl.innerHTML = "";
    this.boxesEl.innerHTML = "";
    this.colorsEl.innerHTML = "";

    const drawBoxes = () => {
      this.boxesEl.style.width = `${this.imgEl.width}px`;
      this.boxesEl.style.height = `${this.imgEl.height}px`;
      this.aiTextEl.classList.add("hidden");

      data.objects.filter(o => objects.includes(o.label)).forEach(({ box, label, score }) => {
        const boxEl = document.createElement("div");
        boxEl.classList.add("overlay--boxes--box");

        boxEl.style.left = `${box[0] * 100}%`;
        boxEl.style.top = `${box[1] * 100}%`;
        boxEl.style.width = `${(box[2] - box[0]) * 100}%`;
        boxEl.style.height = `${(box[3] - box[1]) * 100}%`;

        // boxEl.innerHTML = `${label}: ${score}`;

        this.boxesEl.appendChild(boxEl);
        this.aiTextEl.classList.remove("hidden");
      });
      this.loaderEl.classList.add("hidden");
      this.imgEl.removeEventListener("load", drawBoxes);
    }

    this.loaderEl.classList.remove("hidden");
    this.imgEl.addEventListener("load", drawBoxes);
    this.imgEl.src = `${DetailOverlay.IMG_URL}/${data.id}.jpg`;

    data.color_palette.forEach(([r, g, b]) => {
      const colorEl = document.createElement("div");
      colorEl.classList.add("overlay--colors--box");
      colorEl.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      this.colorsEl.appendChild(colorEl);
    });

    this.titleEl.innerHTML = `<b>${getLabel(titleText)}</b> (${getLabel(yearText)})<br>${getLabel(creatorText)}`;
    this.collectionEl.innerHTML = `<b>${getLabel("collection")}: ${data.museum}</b>`;
    this.linkEl.innerHTML = `${getLabel("information")}`;
    this.linkEl.setAttribute("href", data.url);
    this.linkEl.removeAttribute("download");
  }

  prepareMosaicOverlay() {
    this.loaderEl.classList.remove("hidden");
    this.aiTextEl.classList.add("hidden");
    this.imgEl.src = "";
    [this.boxesEl, this.colorsEl, this.titleEl, this.collectionEl, this.linkEl, this.listEl].forEach(el => el.innerHTML = "");
  }

  populateMosaicOverlay(imgUrl, isAi) {
    this.loaderEl.classList.add("hidden");
    this.imgEl.src = imgUrl;
    this.linkEl.setAttribute("href", imgUrl);
    this.linkEl.setAttribute("download", "acervos.jpg");
    this.linkEl.innerHTML = `${getLabel("download")}`;
    this.listEl.innerHTML = `${getLabel("composition")}`;

    if (isAi) {
      this.aiTextEl.classList.remove("hidden");
    } else {
      this.aiTextEl.classList.add("hidden");
    }
  }
}

export { DetailOverlay };
