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

      artWorks[id].style.aspectRatio = `1 / 1`;
      artWorks[id].style.width = `calc((100% - 48px) / 25)`;

      this.drawingEl.appendChild(artWorks[id]);
    }
    window.scrollTo(0, 0);
  }
}
