document.addEventListener("DOMContentLoaded", () => {
  const menuEl = document.getElementById("sorters--menu");
  const closeButton = document.getElementById("sorters--close--button");

  closeButton.addEventListener("click", () => {
    menuEl.style.left = `${-menuEl.offsetWidth - 1}px`;
  });
});
