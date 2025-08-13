class Drawer {
  constructor() {
    this.containerEl = document.getElementById("canvas--container");
    this.drawingEl = document.getElementById("canvas--drawing");
  }

  resetEl(el) {
    ["aspectRatio", "width", "top", "left", "position"].forEach(s => el.style[s] = "unset");
  }
}
