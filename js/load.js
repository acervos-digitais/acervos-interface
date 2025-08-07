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
  const sorterMenuEl = document.getElementById("sorter--menu");

  const mFilters = new FilterMenu(menuData);
  const mSorters = new SorterMenu(metaData);

  const allIdsSet = new Set(Object.keys(metaData));

  filterMenuEl.addEventListener("filter-data", (evt) => {
    const validIds = mFilters.filter(allIdsSet, !evt.detail.fromDate);
  });
});
