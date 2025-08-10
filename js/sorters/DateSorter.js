class DateSorter extends Sorter {
  constructor(data, enableId, menuId, itemsId) {
    super(data, enableId, menuId, itemsId);
  }

  sort(validIdsSet) {
    if (!this.enableEl.checked) return;

    const year2Ids = Array.from(validIdsSet).reduce((acc, id) => {
      const year = this.data[id].year;
      if (!(year in acc)) {
        acc[year] = [];
      }
      acc[year].push(id);
      return acc;
    }, {});

    const byYear = (a, b) => parseInt(a.year) - parseInt(b.year)

    return Object.entries(year2Ids).map(([year, ids]) => ({year, ids})).sort(byYear);
  }
}
