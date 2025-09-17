import { Drawer } from "./Drawer.js";

class GridDrawer extends Drawer {
  constructor() {
    super();
    this.defaultCols = 8;
  }

  draw(artWorks, sorted, scale) {
    this.arts = [];
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("grid");

    const numCols = parseInt(this.defaultCols / scale);
    const gapSum = (numCols - 1) * 2;

    for (const { id, distance } of sorted) {
      this.resetEl(artWorks[id]);

      artWorks[id].style.aspectRatio = `1 / 1`;
      artWorks[id].style.width = `calc((100% - ${gapSum}px) / ${numCols})`;

      this.drawingEl.appendChild(artWorks[id]);
      this.arts.push(artWorks[id]);
    }
    window.scrollTo(0, 0);
  }

  zoom(scale) {
    const numCols = parseInt(this.defaultCols / scale);
    const gapSum = (numCols - 1) * 2;

    this.arts.forEach(el => el.style.width = `calc((100% - ${gapSum}px) / ${numCols})`);
  }
}

export { GridDrawer };
