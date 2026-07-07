// import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

class Client {
  static apiUrl = "";
  static callUrl = "";
  static async connect(hfId) {
    Client.apiUrl = `https://${hfId.replace("/", "-")}.hf.space/gradio_api`;
    Client.callUrl = `${Client.apiUrl}/call`;
    return Client;
  }

  static async predict(endpoint, obj) {
    const url = `${Client.callUrl}${endpoint}`;
    const postResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [ obj.idBoxes_in ]
      }),
    });

    const postResult = await postResponse.json();

    const eventResponse = await fetch(`${url}/${postResult.event_id}`);
    const eventResultText = await eventResponse.text();

    const dataMatch = eventResultText.match(/event: complete\ndata:\s*(.+)/);
    const dataJsonString = `{"data": ${dataMatch[1]}}`;

    const result = JSON.parse(dataJsonString);
    result.data[0].url = `${Client.apiUrl}/file=${result.data[0].path}`;
    return result;
  }
}

class ExportMenu {
  constructor(metaData) {
    this.data = metaData;
    this.sorted = [];
    this.objects = [];

    this.gradio = null;
    Client.connect("acervos-digitais/acervos-gradio").then(res => this.gradio = res);

    const gridButton = document.getElementById("export--grid--button");
    const compositionButton = document.getElementById("export--composition--button");

    gridButton.addEventListener("click", () => this.createImage("/objects"));
    compositionButton.addEventListener("click", () => this.createImage("/composition"));
  }

  update(sorted, objects) {
    this.sorted = sorted;
    this.objects = objects;

    const gridItemsEl = document.getElementById("export--grid--button");
    const compositionItemsEl = document.getElementById("export--composition--button");

    if (this.sorted.length > 0) {
      gridItemsEl.classList.remove("disabled");
    } else {
      gridItemsEl.classList.add("disabled");
    }

    if (this.sorted.length > 0 && this.objects.length > 0) {
      compositionItemsEl.classList.remove("disabled");
    } else {
      compositionItemsEl.classList.add("disabled");
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
