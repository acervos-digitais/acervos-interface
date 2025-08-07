class CategoryFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (const cat of Object.keys(data)) {
      const labelSlug = cat.replaceAll(" ", "-").toLowerCase();

      const wrapperEl = document.createElement("div");
      wrapperEl.classList.add("checkbox--item");

      const inputEl = document.createElement("input");
      inputEl.type = "checkbox";
      inputEl.id = `${labelSlug}--checkbox`;
      inputEl.value = `${cat}`;

      inputEl.addEventListener("change", () => this.menuEl.dispatchEvent(new CustomEvent("filter-data")));

      const labelEl = document.createElement("label");
      labelEl.setAttribute("for", inputEl.id);
      labelEl.innerHTML = cat;

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
