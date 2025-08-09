class DateSorter extends Sorter {
  constructor(data, enableId, menuId, itemsId) {
    super(data, enableId, menuId, itemsId);
  }

  sort(canvasArtWorks, validIdsSet) {
    if (!this.enableEl.checked) return;

    const validYears = [...new Set(Array.from(validIdsSet).map(x => this.data[x].year))].sort((a, b) => a - b);

    const { yearsIdxs, yearsYs } = validYears.reduce((acc, v, i) => {
      acc.yearsIdxs[v] = i;
      acc.yearsYs[v] = 0;
      return acc;
    }, { yearsIdxs: {}, yearsYs: {} });

    const W = 50;
    const XP = 10;
    const YP = 10;
    for (const artWork of canvasArtWorks) {
      if (!validIdsSet.has(`${artWork.id}`)) {
        artWork.a = 0;
        artWork.x = 0;
        artWork.y = 0;
      } else {
        artWork.a = 1;
        const scaleFactor = W / artWork.w0;
        artWork.w = artWork.w0 * scaleFactor;
        artWork.h = artWork.h0 * scaleFactor;

        const artWorkYear = this.data[artWork.id].year;
        artWork.x = yearsIdxs[artWorkYear] * (W + XP);
        artWork.y = yearsYs[artWorkYear];

        yearsYs[artWorkYear] += (artWork.h + YP);
      }
    }
  }
}
