const META_DATA_URL = "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_processed.json";
const CLUSTER_DATA_URL = "https://raw.githubusercontent.com/acervos-digitais/herbario-data/main/json/20250705_clusters.json";

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

  const mFilterMenu = new FilterMenu(menuData);
  const mSorterMenu = new SorterMenu(metaData);

  filterMenuEl.addEventListener("filter-data", (evt) => {
    // TODO: filter data based on filter menu
    console.log("heard filter-data", evt.detail);
  });
});
