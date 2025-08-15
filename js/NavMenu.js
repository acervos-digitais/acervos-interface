class NavMenu {
  constructor() {
    const closeButton = document.getElementById("nav--close--button");
    const filterButton = document.getElementById("menu--filter--section");
    const sorterButton = document.getElementById("menu--sorter--section");
    const exportButton = document.getElementById("menu--export--section");

    const navMenu = document.getElementById("nav-menu");
    const filterMenu = document.getElementById("filter-menu");
    const sorterMenu = document.getElementById("sorter-menu");
    const exportMenu = document.getElementById("export-menu");

    closeButton.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });

    filterButton.addEventListener("click", () => {
      filterMenu.classList.remove("hidden");
    });

    sorterButton.addEventListener("click", () => {
      sorterMenu.classList.remove("hidden");
    });

    // exportButton.addEventListener("click", () => {
    //   exportMenu.style.left = "0";
    // });
  }
}

export { NavMenu };
