import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

class ExportMenu {
  constructor(metaData) {
    this.data = metaData;
    this.sorted = [];
    this.objects = [];

    this.gradio = null;
    Client.connect("acervos-digitais/acervos-gradio").then(res => this.gradio = res);

    const gridButton = document.getElementById("export--grid--button");
    const xyButton = document.getElementById("export--xy--button");

    gridButton.addEventListener("click", () => this.createImage("/objects"));
    xyButton.addEventListener("click", () => this.createImage("/xy"));
  }

  update(sorted, objects) {
    this.sorted = sorted;
    this.objects = objects;

    const gridItemsEl = document.getElementById("export--grid--button");
    const xyItemsEl = document.getElementById("export--xy--button");

    if (this.sorted.length > 0) {
      gridItemsEl.classList.remove("disabled");
    } else {
      gridItemsEl.classList.add("disabled");
    }

    if (this.sorted.length > 0 && this.objects.length > 0) {
      xyItemsEl.classList.remove("disabled");
    } else {
      xyItemsEl.classList.add("disabled");
    }
  }

  prepData() {
    const idKey = ("ids" in this.sorted[0]) ? "ids" : "id";
    const orderedIds = this.sorted.map(x => x[idKey]).flat();

    return orderedIds.map(id => {
      const boxes = this.data[id].objects.filter(o => this.objects.includes(o.label)).map(o => o.box);
      return { id, boxes }
    });
  }

  async createImage(endpoint) {
    document.dispatchEvent(new CustomEvent("prep-mosaic"));

    const hasObjects = this.objects.length > 0;
    const realEndpoint = hasObjects ? endpoint : "/grid";

    const data = this.prepData();
    const result = await this.gradio.predict(realEndpoint, {
      idBoxes_in: data,
    });

    const evtOpt = {
      detail: {
        isAi: hasObjects,
        url: result.data[0].url,
      }
    };

    document.dispatchEvent(new CustomEvent("show-mosaic", evtOpt));
  }
}

export { ExportMenu };
