class ColorSorter extends Sorter {
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
      this.color = this.hexToRgb(this.picker.value);
      this.menuEl.dispatchEvent(this.sortDataEvent);
    });

    wrapper.appendChild(title);
    wrapper.appendChild(this.picker);
    this.itemsEl.appendChild(wrapper);

    this.color = this.hexToRgb(this.picker.value);
  }

  hexToRgb(hex) {
    return [
      ("0x" + hex[1] + hex[2]) | 0,
      ("0x" + hex[3] + hex[4]) | 0,
      ("0x" + hex[5] + hex[6]) | 0,
    ];
  }

  rgbDist(c0, c1) {
    const c0Range = Math.max(...c0) - Math.min(...c0);
    const c1Range = Math.max(...c1) - Math.min(...c1);
    const greyFactor = c0Range < c1Range && c0Range < 20 ? 255 - c0Range : 0;
    return c0.reduce((s, _, i) => s + Math.abs(c0[i] - c1[i]), greyFactor);
  }

  byDistFromColor(rgb) {
    const byRgbDist = (a, b) => {
      const aMin = Math.min(...a.colors.map(c => this.rgbDist(c, rgb)));
      const bMin = Math.min(...b.colors.map(c => this.rgbDist(c, rgb)));
      return aMin - bMin;
    };
    return byRgbDist;
  }

  sort(canvasArtWorks, validIdsSet) {
    if (!this.enableEl.checked) return;

    const numColumns = parseInt(Math.sqrt(validIdsSet.size));

    const id2colors = Array.from(validIdsSet).map(id => ({
      id: id,
      colors: this.data[id]["color_palette"],
    }));

    const id2Order = id2colors.toSorted(this.byDistFromColor(this.color)).reduce((acc, id, idx) => {
      acc[`${id}`] = idx;
      return acc;
    }, {});

    const W = 50;
    for (const artWork of canvasArtWorks) {
      if (!validIdsSet.has(`${artWork.id}`)) {
        artWork.a = 0;
        artWork.x = 0;
        artWork.y = 0;
      } else {
        artWork.a = 1;
        artWork.w = W;
        artWork.h = W;

        artWork.x = (id2Order[`${artWork.id}`] % numColumns) * W;
        artWork.y = (id2Order[`${artWork.id}`] / numColumns) * W;
      }
    }
  }
}
