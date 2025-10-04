import { Drawer } from "./Drawer.js";

class BinDrawer extends Drawer {
  constructor() {
    super();
    this.defaultWidth = 100;
  }

  draw(artWorks, sorted, zoomLevel) {
    this.arts = [];
    this.years = [];
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("bin");

    const zoomScale = this.scaleFromLevel(zoomLevel);

    let prevYear = 0;

    for (const yearId of sorted) {
      const yearInfoEl = document.createElement("div");
      yearInfoEl.classList.add("year-info");
      yearInfoEl.innerHTML = yearId.year;
      yearInfoEl.style.fontSize = `${1 * zoomScale}rem`;

      if (yearId.year % 5 == 0 || yearId.year - prevYear > 1) {
        yearInfoEl.className = "year-info visible";
      }
      prevYear = yearId.year;

      const yearContainerEl = document.createElement("div");
      yearContainerEl.classList.add("year-container");
      yearContainerEl.appendChild(yearInfoEl);
      this.years.push(yearInfoEl);

      for (const id of yearId.ids) {
        this.resetEl(artWorks[id]);

        artWorks[id].style.aspectRatio = `${artWorks[id].dataset.ratio}`;
        artWorks[id].style.width = `${this.defaultWidth * zoomScale}px`;

        yearContainerEl.appendChild(artWorks[id]);
        this.arts.push(artWorks[id]);
      }

      this.drawingEl.appendChild(yearContainerEl);
    }
    window.scrollTo(0, document.body.scrollHeight);
  }

  scaleFromLevel(zoomLevel) {
    let zoomScale = 7 / 16 * zoomLevel + 1;
    if (zoomLevel < 0) {
      zoomScale = 16 ** (zoomLevel / 20);
    }
    return zoomScale;
  }

  zoom(zoomLevel) {
    const zoomScale = this.scaleFromLevel(zoomLevel);
    this.arts.forEach(el => el.style.width = `${this.defaultWidth * zoomScale}px`);
    this.years.forEach(el => el.style.fontSize = `${1 * zoomScale}rem`);
  }
}

export { BinDrawer };
