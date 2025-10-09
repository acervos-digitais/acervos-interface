import { Overlay } from "./Overlay.js";

class MobileOverlay extends Overlay {
  constructor() {
    super("mobile");
    this.contentEl = document.getElementById("mobile-overlay--list-content");
  }
}

export { MobileOverlay };
