import { Filter } from "./Filter.js";

class CollectionFilter extends Filter {
  constructor(data) {
    super(data, "collection");

    const labelOrder = {
      "Victor Meirelles": 0,
      "Casa dos Ottoni": 1,
      "São João Del Rey": 2,
      "Regional do Caeté": 3,
      "Casa da Hera": 4,
      "Benjamin Constant": 5,
      "Arqueologia de Itaipu": 6,
      "Museu do Diamante": 7,
      "MASP": 8,
      "Museu da Inconfidência": 9,
      "MAC USP": 10,
      "Belas Artes": 11,
      "Pinacoteca de São Paulo": 12,
      "Museu Paulista": 13,
      "Histórico Nacional": 14,
      "Hércules Florence": 15,
      "Brasiliana Itaú": 16,
    };
    const orderedLabels = Object.keys(data).toSorted((a, b) => labelOrder[a] - labelOrder[b]);

    for (const col of orderedLabels) {
      const labelSlug = col.replaceAll(" ", "-").toLowerCase();
      this.createInput("checkbox", `${labelSlug}--checkbox`, col, col);
    }

    this.addAllNone();
  }

  filter(inIdsSet) {
    const selectedVals = this.inputs.filter(el => el.checked).map(el => el.value);

    if (selectedVals.length < 1) {
      return new Set();
      return inIdsSet;
    }

    const selectedIdsSet = selectedVals.reduce((acc, val) => acc.union(new Set(this.data[val])), new Set());
    return inIdsSet.intersection(selectedIdsSet);
  }
}

export { CollectionFilter };
