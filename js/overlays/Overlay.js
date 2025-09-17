class Overlay {
  constructor(slug) {
    const backgroundEl = document.getElementById(`${slug}-overlay--background`);
    const windowEl = document.getElementById(`${slug}-overlay--window`);
    const closeButton = document.getElementById(`${slug}-overlay--close--button`);

    closeButton.addEventListener("click", () => {
      backgroundEl.classList.add("hidden");
    });

    backgroundEl.addEventListener("click", (evt) => {
      if (!windowEl.contains(evt.target)) {
        backgroundEl.classList.add("hidden");
      }
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        backgroundEl.classList.add("hidden");
      }
    });

    this.nowYear = new Date().getFullYear();
  }
}

export { Overlay };
