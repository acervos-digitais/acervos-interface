class SorterMenu {
  constructor(metaData) {
    const menuEl = document.getElementById("sorter-menu");
    const closeButton = document.getElementById("sorters--close--button");

    closeButton.addEventListener("click", () => {
      menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
    });
  }

  sort(inputIdxs) {

  }
}
