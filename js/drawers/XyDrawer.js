class XyDrawer extends Drawer {
  constructor() {
    super();
  }

  draw(artWorks, sorted) {
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("xy");

    for (const { id, x, y } of sorted) {
      this.resetEl(artWorks[id]);
      console.log(artWorks[id].style.aspectRatio, parseFloat(artWorks[id].style.aspectRatio));
      const h = (20 / parseFloat(artWorks[id].style.aspectRatio));

      artWorks[id].style.position = "absolute";
      artWorks[id].style.left = `min(calc(${x} * 100vw), calc(100vw - 20px))`;
      artWorks[id].style.top = `min(calc(${y} * 100vh), calc(100vh - ${h}px))`;
      artWorks[id].style.width = "20px";
      artWorks[id].style.height = "auto";

      this.drawingEl.appendChild(artWorks[id]);
    }
  }
}
