class ExportMenu {
  constructor(metaData) {
    this.data = metaData;
    this.sorted = [];
    this.objects = [];

    const menuEl = document.getElementById("export-menu");
    const closeButton = document.getElementById("export--close--button");

    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });

    const gridButton = document.getElementById("export--grid--button");
    const objectsButton = document.getElementById("export--objects--button");
    const xyButton = document.getElementById("export--xy--button");

    gridButton.addEventListener("click", () => this.createImage("grid"));
    objectsButton.addEventListener("click", () => this.createImage("objects"));
    xyButton.addEventListener("click", () => this.createImage("xy"));
  }

  update(sorted, objects) {
    this.sorted = sorted;
    this.objects = objects;

    const gridItemsEl = document.getElementById("export--grid--items");
    const objectsItemsEl = document.getElementById("export--objects--items");
    const xyItemsEl = document.getElementById("export--xy--items");

    if (this.sorted.length > 0) {
      gridItemsEl.classList.remove("disabled");
    } else {
      gridItemsEl.classList.add("disabled");
    }

    if (this.sorted.length > 0 && this.objects.length > 0) {
      objectsItemsEl.classList.remove("disabled");
      xyItemsEl.classList.remove("disabled");
    } else {
      objectsItemsEl.classList.add("disabled");
      xyItemsEl.classList.add("disabled");
    }
  }

  prepData() {
    console.log(this.data, this.sorted, this.objects);
    // TODO: turn sorted into linear
    //       map [id,id,id,...] -> [{id, boxes:[]}, {id, boxes:[]}, {id, boxes:[]},...]
  }

  createImage(endpoint) {
    const data = this.prepData();

    // TODO: make correct api call
    const url = endpoint;

    // TODO: trigger visualization
    const mosaicOverlayEl = document.getElementById("mosaic-overlay--window");
    const evtOpt = { detail: { url } };
    // mosaicOverlayEl.dispatchEvent(new CustomEvent("show-image", evtOpt));
  }
}
