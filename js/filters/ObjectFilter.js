class ObjectFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (const obj of Object.keys(data)) {
      const labelSlug = obj.replaceAll(" ", "-").toLowerCase();

      const wrapperEl = document.createElement("div");
      wrapperEl.classList.add("checkbox--item");

      const inputEl = document.createElement("input");
      inputEl.type = "checkbox";
      inputEl.id = `${labelSlug}--checkbox`;
      inputEl.value = `${obj}`;

      inputEl.addEventListener("change", () => this.menuEl.dispatchEvent(this.filterDataEvent));

      const labelEl = document.createElement("label");
      labelEl.setAttribute("for", inputEl.id);
      labelEl.innerHTML = obj;

      wrapperEl.appendChild(inputEl);
      wrapperEl.appendChild(labelEl);

      this.itemsEl.appendChild(wrapperEl);
      this.boxes.push(inputEl);
    }
  }

  filter(inputIds) {
    // TODO: filter based on checkboxes
  }
}
