import { combineClusterData, createMenuData, fetchData } from "./load_utils.js";

import { ExportMenu } from "./ExportMenu.js";
import { FilterMenu } from "./FilterMenu.js";
import { SorterMenu } from "./SorterMenu.js";

import { Canvas } from "./Canvas.js";
import { AboutOverlay } from "./overlays/AboutOverlay.js";
import { DetailOverlay } from "./overlays/DetailOverlay.js";
import { ResultsOverlay } from "./overlays/ResultsOverlay.js";

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
  metaData = combineClusterData(metaData, clusterData);

  const detailOverlayEl = document.getElementById("detail-overlay--background");
  const resultsOverlayEl = document.getElementById("results-overlay--background");

  const mCanvas = new Canvas(metaData);
  const mAboutOverlay = new AboutOverlay();
  const mDetailOverlay = new DetailOverlay(metaData);
  const mResultsOverlay = new ResultsOverlay(metaData);
  const mFilters = new FilterMenu(menuData);
  const mSorters = new SorterMenu(metaData, menuData);
  const mExportMenu = new ExportMenu(mDetailOverlay.data);

  const allIdsSet = new Set(Object.values(menuData.collections).flat());

  document.addEventListener("filter-data", () => {
    mSorters.validIdsSet = mFilters.filter(allIdsSet);
    document.dispatchEvent(mSorters.sortDataEvent);
  });

  document.addEventListener("sort-data", () => {
    mCanvas.sorted = mSorters.sort();
    console.log(mCanvas.sorted);
    mCanvas.draw(mSorters.checked);
    mExportMenu.update(mCanvas.sorted, mFilters.objectFilter.selectedVals);
    if (mSorters.checked) {
      mResultsOverlay.populateResultsOverlay(mCanvas.sorted);
    } else {
      const ids = Array.from(mSorters.validIdsSet).map(id => ({ id }));
      mResultsOverlay.populateResultsOverlay(ids);
    }
  });

  document.addEventListener("show-results", () => {
    resultsOverlayEl.classList.remove("hidden");
  });

  document.addEventListener("show-detail", (evt) => {
    mDetailOverlay.populateDetailOverlay(evt.detail.id, mFilters.objectFilter.selectedVals);
    detailOverlayEl.classList.remove("hidden");
  });

  document.addEventListener("prep-mosaic", () => {
    mDetailOverlay.prepareMosaicOverlay();
    detailOverlayEl.classList.remove("hidden");
  });

  document.addEventListener("show-mosaic", (evt) => {
    mDetailOverlay.populateMosaicOverlay(evt.detail.url, evt.detail.isAi);
  });

  // start
  mSorters.validIdsSet = mFilters.filter(allIdsSet);
});
