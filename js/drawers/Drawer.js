class Drawer {
  constructor() {
    this.drawingEl = document.getElementById("canvas--drawing");
  }

  resetEl(el) {
    ["aspectRatio", "width", "top", "left", "position"].forEach(s => el.style[s] = "unset");
  }
}

export { Drawer };
