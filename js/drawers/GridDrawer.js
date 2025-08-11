class GridDrawer extends Drawer {
  constructor() {
    super();
  }

  draw(artWorks, sorted) {
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("grid");

    for (const { id, distance } of sorted) {
      this.resetEl(artWorks[id]);

      artWorks[id].style.width = "50px";
      artWorks[id].style.height = artWorks[id].style.width;

      this.drawingEl.appendChild(artWorks[id]);
    }
  }
}
