import { Drawer } from "./Drawer.js";

class XyDrawer extends Drawer {
  constructor() {
    super();
    this.defaultWidth = 20;
  }

  draw(artWorks, sorted, scale) {
    this.arts = [];
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("xy");

    const canvasH = this.drawingEl.offsetHeight;

    for (const { id, x, y } of sorted) {
      this.resetEl(artWorks[id]);

      const w = scale * this.defaultWidth;
      const h = (w / parseFloat(artWorks[id].dataset.ratio));

      const ypx = Math.min(y * canvasH, canvasH - h);

      artWorks[id].style.position = "absolute";
      artWorks[id].style.left = `min(calc(${x} * 100vw), calc(100vw - ${w}px))`;
      artWorks[id].style.top = `${ypx}px`;
      artWorks[id].style.aspectRatio = `${artWorks[id].dataset.ratio}`;
      artWorks[id].style.width = `${w}px`;

      this.drawingEl.appendChild(artWorks[id]);
      this.arts.push(artWorks[id]);
    }
  }

  zoom(scale) {

  }
}

export { XyDrawer };
