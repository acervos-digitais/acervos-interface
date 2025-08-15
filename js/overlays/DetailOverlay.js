import { getLabel } from "../label_strings.js";
import { Overlay } from "./Overlay.js";

class DetailOverlay extends Overlay {
  static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";

  constructor(metaData) {
    super("detail");

    this.data = Object.values(metaData).map(x => {
      const { id, color_palette, creator, museum, objects, title, url, year } = x;
      return { id, color_palette, creator, museum, objects, title, url, year };
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});
  }

  populateDetailOverlay(id, objects) {
    const data = this.data[id];

    const imgEl = document.getElementById("detail-overlay--image");
    const boxesEl = document.getElementById("detail-overlay--boxes");
    const colorsEl = document.getElementById("detail-overlay--colors");

    const titleEl = document.getElementById("detail-overlay--title--text");
    const collectionEl = document.getElementById("detail-overlay--collection--text");
    const linkEl = document.getElementById("detail-overlay--info--link");

    const titleText = data.title == "" ? "untitled" : data.title;
    const yearText = (data.year == 9999) ? "undated" : `${data.year}`;
    const creatorText = data.creator.includes("http") || data.creator.includes("known") || data.creator == "" ? "unauthored" : `${data.creator}`;

    boxesEl.innerHTML = "";
    colorsEl.innerHTML = "";

    function drawBoxes() {
      boxesEl.style.width = `${imgEl.width}px`;
      boxesEl.style.height = `${imgEl.height}px`;

      data.objects.filter(o => objects.includes(o.label)).forEach(({ box, label, score }) => {
        const boxEl = document.createElement("div");
        boxEl.classList.add("overlay--boxes--box");

        boxEl.style.left = `${box[0] * 100}%`;
        boxEl.style.top = `${box[1] * 100}%`;
        boxEl.style.width = `${(box[2] - box[0]) * 100}%`;
        boxEl.style.height = `${(box[3] - box[1]) * 100}%`;

        // boxEl.innerHTML = `${label}: ${score}`;

        boxesEl.appendChild(boxEl);
      });
      imgEl.removeEventListener("load", drawBoxes);
    }

    imgEl.addEventListener("load", drawBoxes);
    imgEl.src = `${DetailOverlay.IMG_URL}/${data.id}.jpg`;

    data.color_palette.forEach(([r, g, b]) => {
      const colorEl = document.createElement("div");
      colorEl.classList.add("overlay--colors--box");
      colorEl.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      colorsEl.appendChild(colorEl);
    });

    titleEl.innerHTML = `${getLabel(titleText)} (${getLabel(yearText)})<br>${getLabel(creatorText)}`;
    collectionEl.innerHTML = `${getLabel("collection")}: ${data.museum}`;
    linkEl.setAttribute("href", data.url);
  }

  populateMosaicOverlay(imgUrl) {
    const imgEl = document.getElementById("detail-overlay--image");
    const boxesEl = document.getElementById("detail-overlay--boxes");
    const colorsEl = document.getElementById("detail-overlay--colors");

    const titleEl = document.getElementById("detail-overlay--title--text");
    const collectionEl = document.getElementById("detail-overlay--collection--text");
    const linkEl = document.getElementById("detail-overlay--info--link");

    [boxesEl, colorsEl, titleEl, collectionEl, linkEl].forEach(el => el.innerHTML = "");

    imgEl.src = imgUrl;
  }
}

export { DetailOverlay };
