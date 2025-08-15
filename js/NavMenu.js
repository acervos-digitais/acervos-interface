class NavMenu {
  constructor() {
    const closeButton = document.getElementById("nav--close--button");
    const filterButton = document.getElementById("menu--filter--section");
    const sorterButton = document.getElementById("menu--sorter--section");

    const navMenu = document.getElementById("nav-menu");
    const filterMenu = document.getElementById("filter-menu");
    const sorterMenu = document.getElementById("sorter-menu");
    const canvasEl = document.getElementById("canvas--container");

    closeButton.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
      canvasEl.classList.toggle("menu");
    });

    filterButton.addEventListener("click", () => {
      filterMenu.classList.remove("hidden");
    });

    sorterButton.addEventListener("click", () => {
      sorterMenu.classList.remove("hidden");
    });
  }
}

export { NavMenu };
