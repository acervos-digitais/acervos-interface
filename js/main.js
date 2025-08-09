// const META_DATA_URL = "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_processed.json";
// const CLUSTER_DATA_URL = "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_clusters.json";

const META_DATA_URL = "../json/20250705_processed.json";
const CLUSTER_DATA_URL = "../json/20250705_clusters.json";

const metaDataP = fetchData(META_DATA_URL);
const clusterDataP = fetchData(CLUSTER_DATA_URL);

let metaData = null;
let clusterData = null;
let menuData = null;

document.addEventListener("DOMContentLoaded", async () => {
  metaData = await metaDataP;
  clusterData = await clusterDataP;
  menuData = createMenuData(metaData, clusterData);

  const filterMenuEl = document.getElementById("filter-menu");
  const sorterMenuEl = document.getElementById("sorter-menu");

  const mFilters = new FilterMenu(menuData);
  const mSorters = new SorterMenu(metaData);
  const mCanvas = new Canvas(metaData);

  const allIdsSet = new Set(Object.keys(metaData));

  filterMenuEl.addEventListener("filter-data", () => {
    mSorters.validIdsSet = mFilters.filter(allIdsSet);
    mSorters.sort(mCanvas.allArtWorks);
    mCanvas.draw(mSorters.checked);
  });

  sorterMenuEl.addEventListener("sort-data", () => {
    mSorters.sort(mCanvas.allArtWorks);
    mCanvas.draw(mSorters.checked);
  });

  // start
  mSorters.validIdsSet = mFilters.filter(allIdsSet);
});
