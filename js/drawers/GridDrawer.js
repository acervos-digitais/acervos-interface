import { Drawer } from "./Drawer.js";

class GridDrawer extends Drawer {
  constructor() {
    super();
  }

  draw(artWorks, sorted, scale) {
    this.art = [];
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("grid");

    for (const { id, distance } of sorted) {
      this.resetEl(artWorks[id]);

      artWorks[id].style.aspectRatio = `1 / 1`;
      artWorks[id].style.width = `calc((100% - 48px) * ${scale / 25})`;

      this.drawingEl.appendChild(artWorks[id]);
      this.art.push(artWorks[id]);
    }
    window.scrollTo(0, 0);
  }

  zoom(scale) {
    this.art.forEach(el => el.style.width = `calc((100% - 48px) * ${scale / 25})`);
  }
}

export { GridDrawer };
