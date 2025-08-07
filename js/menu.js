document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.getElementById("menu--filter--section");
  const sorterButton = document.getElementById("menu--sorter--section");

  const filterMenu = document.getElementById("filters--menu");
  const sorterMenu = document.getElementById("sorters--menu");

  filterButton.addEventListener("click", () => {
    filterMenu.style.left = "0";
  });

  sorterButton.addEventListener("click", () => {
    sorterMenu.style.left = "0";
  });
});
