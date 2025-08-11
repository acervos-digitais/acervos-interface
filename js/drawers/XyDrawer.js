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

      artWorks[id].style.position = "absolute";
      artWorks[id].style.left = `calc(${x} * 100vw - 20px)`;
      artWorks[id].style.top = `calc(${y} * 100vh - 20px)`;
      artWorks[id].style.width = "20px";
      artWorks[id].style.height = "auto";

      this.drawingEl.appendChild(artWorks[id]);
    }
  }
}
