class DateColorSorter extends DateSorter {
  constructor(data, enableId, menuId, itemsId) {
    super(data, enableId, menuId, itemsId);

    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    const title = document.createElement("div");
    title.innerHTML = "Selecione uma cor";

    this.picker = document.createElement("input");
    this.picker.type = "color";
    this.picker.value = "#000";
    this.picker.classList.add("sorter--color-picker");

    this.picker.addEventListener("change", () => {
      this.color = ColorSorter.hexToRgb(this.picker.value);
      this.menuEl.dispatchEvent(this.sortDataEvent);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(this.picker);
    this.itemsEl.appendChild(wrapper);

    this.color = ColorSorter.hexToRgb(this.picker.value);
  }

  sort(validIdsSet) {
    if (!this.enableEl.checked) return;

    const byYear = super.sort(validIdsSet);

    return byYear.map(({ year, ids }) => ({
      year,
      ids: ColorSorter.sortIdColors(ids, this.data, this.color).map(x => x.id)
    }));
  }
}
