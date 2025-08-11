class XyDrawer extends Drawer {
  constructor() {
    super();
  }

  draw(artWorks, sorted) {
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("xy");

    for (const { id, distance } of sorted) {
      artWorks[id].style.height = artWorks[id].style.width;
      this.drawingEl.appendChild(artWorks[id]);
    }
  }
}
