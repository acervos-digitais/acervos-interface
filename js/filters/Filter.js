class Filter {
  constructor(data, slug) {
    this.itemsEl = document.getElementById(`filter--${slug}--items`);
    this.menuEl = document.getElementById("filter-menu");

    this.data = data;
    this.inputs = [];
    this.evtOpt = { detail: { fromDate: false } };
    this.filterDataEvent = new CustomEvent("filter-data", this.evtOpt);
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
}

export { Filter };
