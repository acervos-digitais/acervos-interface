// TODO: load cluster data
// TODO: load data, create menu data

document.addEventListener("DOMContentLoaded", () => {
  const menuEl = document.getElementById("filters--menu");
  const closeButton = document.getElementById("filters--close--button");

  closeButton.addEventListener("click", () => {
    menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
  });

  // TODO: instantiated filter objects

  menuEl.addEventListener("filter-data", () => {
    // TODO: filter data based on instantiated filters
    console.log("heard filter-data")
  });
});
