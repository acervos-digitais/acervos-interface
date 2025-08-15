class Overlay {
  constructor(slug) {
    const backgroundEl = document.getElementById(`${slug}-overlay--background`);
    const windowEl = document.getElementById(`${slug}-overlay--window`);
    const closeButton = document.getElementById(`${slug}-overlay--close--button`);

    closeButton.addEventListener("click", () => {
      backgroundEl.classList.add("hide");
    });

    backgroundEl.addEventListener("click", (evt) => {
      if (!windowEl.contains(evt.target)) {
        backgroundEl.classList.add("hide");
      }
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        backgroundEl.classList.add("hide");
      }
    });
  }
}

export { Overlay };
