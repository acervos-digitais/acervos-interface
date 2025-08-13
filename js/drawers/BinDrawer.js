class BinDrawer extends Drawer {
  constructor() {
    super();
  }

  draw(artWorks, sorted) {
    this.drawingEl.innerHTML = "";

    this.drawingEl.classList = ["canvas--drawing"];
    this.drawingEl.classList.add("bin");

    let prevYear = 0;

    for (const yearId of sorted) {
      const yearInfoEl = document.createElement("div");
      yearInfoEl.classList.add("year-info");
      yearInfoEl.innerHTML = yearId.year;

      if (yearId.year % 5 == 0 || yearId.year - prevYear > 1) {
        yearInfoEl.style.opacity = "1";
      }
      prevYear = yearId.year;

      const yearContainerEl = document.createElement("div");
      yearContainerEl.classList.add("year-container");
      yearContainerEl.appendChild(yearInfoEl);

      for (const id of yearId.ids) {
        this.resetEl(artWorks[id]);

        artWorks[id].style.aspectRatio = `${artWorks[id].dataset.ratio}`;
        artWorks[id].style.width = "50px";

        yearContainerEl.appendChild(artWorks[id]);
      }

      this.drawingEl.appendChild(yearContainerEl);
    }
  }
}
