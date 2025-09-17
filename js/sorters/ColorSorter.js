import { Sorter } from "./Sorter.js";

class ColorSorter extends Sorter {
  constructor(data) {
    super(data, "color");

    this.picker = document.getElementById("color--sorter--color-picker");

    const dispatchColor = () => {
      this.color = ColorSorter.hexToRgb(this.picker.value);
      document.dispatchEvent(this.sortDataEvent);
    };
    this.dispatchTimeout = null;

    this.picker.addEventListener("input", () => {
      if (this.dispatchTimeout !== null) {
        clearTimeout(this.dispatchTimeout);
      }
      this.dispatchTimeout = setTimeout(dispatchColor, 100);
    });

    this.color = ColorSorter.hexToRgb(this.picker.value);
  }

  static hexToRgb(hex) {
    return [
      ("0x" + hex[1] + hex[2]) | 0,
      ("0x" + hex[3] + hex[4]) | 0,
      ("0x" + hex[5] + hex[6]) | 0,
    ];
  }

  static rgbDist(c0, c1) {
    const c0Range = Math.max(...c0) - Math.min(...c0);
    const c1Range = Math.max(...c1) - Math.min(...c1);
    const greyFactor = c0Range < c1Range && c0Range < 20 ? 255 - c0Range : 0;
    return c0.reduce((s, _, i) => s + Math.abs(c0[i] - c1[i]), greyFactor);
  }

  static minDist(colors, rgb) {
    return Math.min(...colors.map(c => ColorSorter.rgbDist(c, rgb)));
  }

  static byDistFromColor(rgb) {
    const byRgbDist = (a, b) => {
      const aMin = ColorSorter.minDist(a.colors, rgb);
      const bMin = ColorSorter.minDist(b.colors, rgb);
      return aMin - bMin;
    };
    return byRgbDist;
  }

  static sortIdColors(ids, data, color) {
    const id2colors = ids.map(id => ({
      id: id,
      colors: data[id]["color_palette"],
    }));
    return id2colors.toSorted(ColorSorter.byDistFromColor(color));
  }

  sort(validIdsSet) {
    if (!this.enableEl.checked) return;

    const idColorsSorted = ColorSorter.sortIdColors(Array.from(validIdsSet), this.data, this.color);

    return idColorsSorted.map(({ id, colors }) => ({
      id: id,
      dist: ColorSorter.minDist(colors, this.color)
    }));
  }
}

export { ColorSorter };
