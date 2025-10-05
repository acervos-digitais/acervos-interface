import { getLabel } from "../label_strings.js";
import { Overlay } from "./Overlay.js";

class ResultsOverlay extends Overlay {
  constructor(metaData) {
    super("results");

    this.data = Object.values(metaData).map(x => {
      const { id, creator, museum, title, url, year } = x;
      return { id, creator, museum, title, url, year };
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});

    this.contentEl = document.getElementById("results-overlay--list-content");
  }

  createItemEl(data) {
    const titleText = data.title == "" ? "untitled" : `${data.title}`;
    const yearText = (data.year > this.nowYear) ? "undated" : `${data.year}`;
    const creatorText = data.creator.includes("http") || data.creator.includes("known") || data.creator.includes("ão identificado") || data.creator == "" ? "unauthored" : `${data.creator}`;

    const itemEl = document.createElement("div");
    itemEl.classList.add("overlay--list--item");

    const IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";
    const imgEl = document.createElement('img');
    imgEl.src = `${IMG_URL}/${data.id}.jpg`;

    const pEl = document.createElement('p');
    pEl.innerHTML = `${getLabel(creatorText)}, ${getLabel(titleText)} (${getLabel(yearText)}).<br>`;

    const linkEl = document.createElement("a");
    linkEl.innerHTML = `${data.museum}`;
    linkEl.setAttribute("href", data.url);
    linkEl.setAttribute("target", "_blank");

    itemEl.appendChild(imgEl);
    itemEl.appendChild(pEl);
    pEl.appendChild(linkEl);
    return itemEl;
  }

  populateResultsOverlay(sorted) {
    const sortedIds = sorted.map(x => ("id" in x) ? x.id : x.ids).flat();
    this.contentEl.innerHTML = "";
    for (const id of sortedIds) {
      const itemEl = this.createItemEl(this.data[id]);
      this.contentEl.appendChild(itemEl);
    }
  }
}

export { ResultsOverlay };
