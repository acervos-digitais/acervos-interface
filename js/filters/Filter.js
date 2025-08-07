class Filter {
  constructor(data, menuId, enabledId, itemsId) {
    this.menuEl = document.getElementById(menuId);
    this.enabledEl = document.getElementById(enabledId);
    this.itemsEl = document.getElementById(itemsId);

    this.data = data;
    this.inputs = [];
    this.evtOpt = { detail: { fromDate: false } };
    this.filterDataEvent = new CustomEvent("filter-data", this.evtOpt);

    this.enabledEl.addEventListener("change", () => {
      if (this.enabledEl.checked) {
        this.itemsEl.classList.remove("disabled");
      } else {
        this.itemsEl.classList.add("disabled");
        for (const b of this.inputs) {
          b.checked = false;
        }
      }
      this.menuEl.dispatchEvent(new CustomEvent("filter-data", { detail: { fromDate: false } }));
    });
  }

  createInput(type, id, value, label, name=null) {
    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add(`${type}--item`);

    const inputEl = document.createElement("input");
    inputEl.type = type;
    inputEl.id = id;
    inputEl.value = value;
    if (name) inputEl.name = name;

    inputEl.addEventListener("change", () => this.menuEl.dispatchEvent(this.filterDataEvent));

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", inputEl.id);
    labelEl.innerHTML = label;

    wrapperEl.appendChild(inputEl);
    wrapperEl.appendChild(labelEl);

    this.itemsEl.appendChild(wrapperEl);
    this.inputs.push(inputEl);
  }

  filter(inputIdsSet) {
    if (!this.enabledEl.checked) {
      return inputIdsSet;
    }

    // TODO: filter Ids
  }
}
