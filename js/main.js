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

const pageURL = window.location.href.replace(/^https?:\/\//, '');
const isMobile = pageURL.includes('mobile');

document.addEventListener("DOMContentLoaded", async () => {
  metaData = await metaDataP;
  clusterData = await clusterDataP;
  menuData = createMenuData(metaData, clusterData);
  metaData = combineClusterData(metaData, clusterData);

  const detailOverlayEl = document.getElementById("detail-overlay--background");
  const resultsOverlayEl = document.getElementById("results-overlay--background");

  const canvasWrapper = document.getElementById('canvas--wrapper');
  const canvasDrawing = document.getElementById('canvas--drawing');
  const scrollV = document.getElementById('scrollbar--vertical');
  const scrollH = document.getElementById('scrollbar--horizontal');

  if (!isMobile) {
    initScrollbar(canvasDrawing, canvasWrapper, scrollV, scrollH);

    const menuInfoList = document.getElementsByClassName('menu--info');
    [...menuInfoList].forEach(mi => initMenuInfo(mi));

    initCanvasDrag(canvasDrawing);

  } else {
    initMuseumButtons();
  }

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
    // console.log(mCanvas.sorted);
    mCanvas.draw(mSorters.checked);
    mExportMenu.update(mCanvas.sorted, mFilters.objectFilter.selectedVals);
    if (mSorters.checked) {
      mResultsOverlay.populateResultsOverlay(mCanvas.sorted);
    } else {
      const ids = Array.from(mSorters.validIdsSet).map(id => ({ id }));
      mResultsOverlay.populateResultsOverlay(ids);
    }

    if (canvasDrawing.classList.contains('bin')) {
      canvasDrawing.scrollTo(0, canvasDrawing.scrollHeight);
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



// SCROLLBAR

function initScrollbar(content, container, scrollV, scrollH) {
  // vertical handle

  const handleV = document.createElement('div');
  handleV.id = 'scrollbar--handle-vertical';
  handleV.className = 'scrollbar--handle';
  handleV.style.top = '0';
  handleV.style.right = '0';
  handleV.style.width = '9px';
  handleV.style.borderRadius = '4px';
  handleV.style.margin = '2px';
  scrollV.appendChild(handleV);

  // horizontal handle
  const handleH = document.createElement('div');
  handleH.id = 'scrollbar--handle-horizontal';
  handleH.className = 'scrollbar--handle';
  handleH.style.top = '0';
  handleH.style.left = '0';
  handleH.style.height = '9px';
  handleH.style.borderRadius = '4px';
  handleH.style.margin = '2px';
  scrollH.appendChild(handleH);

  // update
  let isDraggingV = false, isDraggingH = false;
  let startY, startX, startHandleVPos, startHandleHPos;

  function updateScrollbar() {
    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    const contentHeight = content.scrollHeight;
    const contentWidth = content.scrollWidth;

    const marginV = parseFloat(handleV.style.margin) * 2 + parseFloat(handleH.style.height);
    const handleVHeight = Math.max((containerHeight / contentHeight) * containerHeight - marginV, 20);
    handleV.style.height = handleVHeight + 'px';
    const heightDelta = contentHeight - containerHeight;
    if (handleVHeight === containerHeight || heightDelta === 0) {
      handleV.style.display = 'none';
    } else {
      const scrollVPercentage = content.scrollTop / heightDelta;
      const handleVPos = scrollVPercentage * (containerHeight - handleVHeight - marginV);
      handleV.style.transform = `translateY(${handleVPos}px)`;
      handleV.style.display = 'block';
    }

    const marginH = parseFloat(handleH.style.margin) * 2 + parseFloat(handleV.style.width);
    const handleHWidth = Math.max((containerWidth / contentWidth) * containerWidth - marginH, 20);
    handleH.style.width = handleHWidth + 'px';
    const widthDelta = contentWidth - containerWidth;
    if (handleHWidth === containerWidth || widthDelta === 0) {
      handleH.style.display = 'none';
    } else {
      const scrollHPercentage = content.scrollLeft / widthDelta;
      const handleHPos = scrollHPercentage * (containerWidth - handleHWidth - marginH);
      handleH.style.transform = `translateX(${handleHPos}px)`;
      handleH.style.display = 'block';
    }
  }

  // vertical drag
  function startDragV(e) {
    isDraggingV = true;
    startY = e.clientY;
    startHandleVPos = parseFloat(handleV.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
    e.preventDefault();
  }

  function dragV(e) {
    if (!isDraggingV) return;
    const deltaY = e.clientY - startY;
    const containerHeight = container.clientHeight;
    const contentHeight = content.scrollHeight;
    const handleVHeight = handleV.clientHeight;

    const newHandlePos = Math.min(Math.max(startHandleVPos + deltaY, 0), containerHeight - handleVHeight);
    const scrollPercentage = newHandlePos / (containerHeight - handleVHeight);
    content.scrollTop = scrollPercentage * (contentHeight - containerHeight);

    requestAnimationFrame(updateScrollbar);
  }

  function endDragV() {
    isDraggingV = false;
  }

  function startDragH(e) {
    isDraggingH = true;
    startX = e.clientX;
    startHandleHPos = parseFloat(handleH.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    e.preventDefault();
  }

  // horizontal drag
  function dragH(e) {
    if (!isDraggingH) return;
    const deltaX = e.clientX - startX;
    const containerWidth = container.clientWidth;
    const contentWidth = content.scrollWidth;
    const handleHWidth = handleH.clientWidth;

    const newHandlePos = Math.min(Math.max(startHandleHPos + deltaX, 0), containerWidth - handleHWidth);
    const scrollPercentage = newHandlePos / (containerWidth - handleHWidth);
    content.scrollLeft = scrollPercentage * (contentWidth - containerWidth);

    requestAnimationFrame(updateScrollbar);
  }

  function endDragH() {
    isDraggingH = false;
  }

  // setup
  handleV.addEventListener('mousedown', startDragV);
  handleH.addEventListener('mousedown', startDragH);
  window.addEventListener('mousemove', e => { dragV(e); dragH(e); });
  window.addEventListener('mouseup', () => { endDragV(); endDragH(); });
  content.addEventListener('scroll', updateScrollbar);
  window.addEventListener('resize', updateScrollbar);
  content.addEventListener("scrollbar-update", updateScrollbar);
  const scrollbarObserver = new MutationObserver(updateScrollbar);
  scrollbarObserver.observe(content, { childList: true });

  updateScrollbar();
}



// HOVER INFO

function initMenuInfo(mi) {
  let hoverDiv = null;

  function createHover() {
    if (hoverDiv) hoverDiv.remove();
    const div = document.createElement('div');
    div.innerHTML = mi.innerHTML;
    div.className = 'menu--info--container';
    div.style.top = `${mi.getBoundingClientRect().top + window.scrollY}px`;
    div.style.left = `${mi.getBoundingClientRect().right + window.scrollX + 8}px`;
    document.body.appendChild(div);
    hoverDiv = div;
  }

  function removeHover() {
    if (!hoverDiv) return;
    hoverDiv.remove();
    hoverDiv = null;
  }

  mi.addEventListener('mouseenter', createHover);
  mi.addEventListener('mouseleave', removeHover);
  mi.addEventListener('wheel', (event) => {
    if (!hoverDiv) return;
    setTimeout(() => {
      const hoveredEl = document.elementFromPoint(event.clientX, event.clientY);
      if (!mi.contains(hoveredEl)) removeHover();
    }, 100);
  });
}



// CANVAS DRAG

function initCanvasDrag(cnv) {
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  document.addEventListener("mousedown", e => {
    if (!cnv.classList.contains('bin') && !cnv.classList.contains('xy')) return;
    if (e.target.tagName !== 'DIV') return;

    isDragging = true;
    cnv.classList.add("dragging");

    startX = e.pageX - cnv.offsetLeft;
    startY = e.pageY - cnv.offsetTop;
    scrollLeft = cnv.scrollLeft;
    scrollTop = cnv.scrollTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const x = e.pageX - cnv.offsetLeft;
    const y = e.pageY - cnv.offsetTop;
    const moveX = x - startX;
    const moveY = y - startY;

    cnv.scrollLeft = scrollLeft - moveX;
    cnv.scrollTop = scrollTop - moveY;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    cnv.classList.remove("dragging");
  });
}



// MOBILE MUSEUM BUTTONS

function initMuseumButtons() {
  const mbOpen = document.getElementById('museums--button-open');
  const mbClose = document.getElementById('museums--button-close');
  const mbItems = document.getElementById('filter--collection--items');

  let mbIsOpened = true;
  function toggleMBState(state) {
    mbIsOpened = state;
    mbOpen.classList.toggle('hidden', mbIsOpened);
    mbClose.classList.toggle('hidden', !mbIsOpened);
    mbItems.classList.toggle('hidden', !mbIsOpened);
  }

  mbOpen.addEventListener('click', () => toggleMBState(true));
  mbClose.addEventListener('click', () => toggleMBState(false));
}