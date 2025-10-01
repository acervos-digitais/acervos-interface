import { getLabel } from "../label_strings.js";

class Filter {
  constructor(data, slug) {
    this.itemsEl = document.getElementById(`filter--${slug}--items`);

    this.data = data;
    this.slug = slug;
    this.inputs = [];
    this.evtOpt = { detail: { fromDate: false } };
    this.filterDataEvent = new CustomEvent("filter-data", this.evtOpt);
  }

  createInput(type, id, value, label, name = null) {
    const inputEl = this.createInputNoListener(type, id, value, label, name);
    inputEl.addEventListener("change", () => {
      this.checkCollections();
      document.dispatchEvent(this.filterDataEvent);
    });
  }

  createInputNoListener(type, id, value, label, name = null) {
    const wrapperEl = document.createElement("div");
    wrapperEl.classList.add(`${type}--item`);

    const inputEl = document.createElement("input");
    inputEl.type = type;
    inputEl.id = `${id}--checkbox`;
    inputEl.value = value;
    if (name) inputEl.name = name;

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", inputEl.id);
    labelEl.innerHTML = getLabel(label);
    labelEl.id = `${id}--label`;

    wrapperEl.appendChild(inputEl);
    wrapperEl.appendChild(labelEl);

    this.itemsEl?.appendChild(wrapperEl);
    this.inputs.push(inputEl);
    return inputEl;
  }

  addSpacer() {
    const spacerEl = document.createElement("div");
    spacerEl.style.width = "100%";
    spacerEl.style.height = "0";
    this.itemsEl.appendChild(spacerEl);
  }

  addAllNone() {
    this.addSpacer();

    this.createInputNoListener("checkbox", `all--${this.slug}`, "all", getLabel("all"));
    this.createInputNoListener("checkbox", `none--${this.slug}`, "none", getLabel("none"));

    const noneInput = this.inputs.pop();
    const allInput = this.inputs.pop();
    noneInput.className = 'none';
    allInput.className = 'all';

    allInput.addEventListener("change", () => {
      this.inputs.forEach(el => el.checked = true);
      allInput.checked = false;
      noneInput.checked = false;
      document.dispatchEvent(this.filterDataEvent);
    });

    noneInput.addEventListener("change", () => {
      this.inputs.forEach(el => el.checked = false);
      allInput.checked = false;
      noneInput.checked = false;
      document.dispatchEvent(this.filterDataEvent);
    });
  }

  checkCollections() {
    const allCollectionsInputEl = document.getElementById("all--collection");
    const collectionsInputEls = document.getElementById("filter--collection--items").querySelectorAll("input");
    const totalCollections = collectionsInputEls.length;
    const checkedCollections = Array.from(collectionsInputEls).filter(el => el.checked).length;
    if (this.slug != "collection" && checkedCollections < 1 && totalCollections > 0) {
      allCollectionsInputEl.click();
    }
  }
}

export { Filter };
