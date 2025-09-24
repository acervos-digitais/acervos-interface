import { Sorter } from "./Sorter.js";

class DateSorter extends Sorter {
  constructor(data) {
    super(data, "date");
  }

  static sortByYear(ids, data) {
    const year2Ids = Array.from(ids).reduce((acc, id) => {
      const year = data[id].year;
      if (!(year in acc)) {
        acc[year] = [];
      }
      acc[year].push(id);
      return acc;
    }, {});

    const byYear = (a, b) => parseInt(a.year) - parseInt(b.year)

    return Object.entries(year2Ids).map(([year, ids]) => ({year, ids})).sort(byYear);
  }

  sort(validIdsSet) {
    if (!this.enableEl.checked) return;

    return DateSorter.sortByYear(validIdsSet, this.data);
  }
}

export { DateSorter };
