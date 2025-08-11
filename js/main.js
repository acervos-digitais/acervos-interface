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
  metaData = combineClusterData(metaData, clusterData);

  const filterMenuEl = document.getElementById("filter-menu");
  const sorterMenuEl = document.getElementById("sorter-menu");

  const mMenu = new NavMenu();
  const mFilters = new FilterMenu(menuData);
  const mSorters = new SorterMenu(metaData);
  const mCanvas = new Canvas(metaData);
  const mDetailOverlay = new DetailOverlay(metaData);

  const allIdsSet = new Set(Object.keys(metaData));

  filterMenuEl.addEventListener("filter-data", () => {
    mSorters.validIdsSet = mFilters.filter(allIdsSet);
    sorterMenuEl.dispatchEvent(mSorters.sortDataEvent);
  });

  sorterMenuEl.addEventListener("sort-data", () => {
    mCanvas.sorted = mSorters.sort();
    console.log(mCanvas.sorted);
    mCanvas.draw(mSorters.checked);
  });

  // start
  mSorters.validIdsSet = mFilters.filter(allIdsSet);
});
