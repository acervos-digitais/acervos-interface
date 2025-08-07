class ClusterFilter extends Filter {
  constructor(data, menuId, enabledId, itemsId) {
    super(data, menuId, enabledId, itemsId);

    for (let clusterIdx = 0; clusterIdx < data.length; clusterIdx++) {
      const wrapperEl = document.createElement("div");
      wrapperEl.classList.add("radio--item");

      const inputEl = document.createElement("input");
      inputEl.type = "radio";
      inputEl.name = "cluster--radio";
      inputEl.id = `cluster--${clusterIdx}--radio`;
      inputEl.value = `${clusterIdx}`;

      inputEl.addEventListener("change", () => this.menuEl.dispatchEvent(new CustomEvent("filter-data")));

      const labelEl = document.createElement("label");
      labelEl.setAttribute("for", inputEl.id);
      labelEl.innerHTML = data[clusterIdx].label;

      wrapperEl.appendChild(inputEl);
      wrapperEl.appendChild(labelEl);

      this.itemsEl.appendChild(wrapperEl);
      this.boxes.push(inputEl);
    }
  }

  filter(inputIds) {
    // TODO: filter based on buttons
  }
}
