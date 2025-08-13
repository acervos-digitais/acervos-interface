class DetailOverlay {
  static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/500";

  constructor(metaData) {
    this.data = Object.values(metaData).map(x => {
      const { id, color_palette, creator, museum, objects, title, url, year } = x;
      return { id, color_palette, creator, museum, objects, title, url, year };
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});

    const backgroundEl = document.getElementById("detail-overlay--background");
    const windowEl = document.getElementById("detail-overlay--window");
    const closeButton = document.getElementById("detail-overlay--close--button");

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

  populateOverlay(id, objects) {
    const data = this.data[id];

    const imgEl = document.getElementById("detail-overlay--image");
    const boxesEl = document.getElementById("detail-overlay--boxes");
    const colorsEl = document.getElementById("detail-overlay--colors");

    const titleEl = document.getElementById("detail-overlay--title--text");
    const collectionEl = document.getElementById("detail-overlay--collection--text");
    const linkEl = document.getElementById("detail-overlay--info--link");

    const yearText = (data.year == 9999) ? "Sem Data" : `${data.year}`;
    const creatorText = data.creator.includes("http") || data.creator.includes("known") ? "Autoria Desconhecida" : `${data.creator}`;

    boxesEl.innerHTML = "";
    colorsEl.innerHTML = "";

    function drawBoxes() {
      boxesEl.style.width = `${imgEl.width}px`;
      boxesEl.style.height = `${imgEl.height}px`;

      data.objects.filter(o => objects.includes(o.label)).forEach(({ box, label, score }) => {
        const boxEl = document.createElement("div");
        boxEl.classList.add("overlay--boxes--box");

        boxEl.style.left = `${box[0] * 100}%`;
        boxEl.style.top = `${box[1] * 100}%`;
        boxEl.style.width = `${(box[2] - box[0]) * 100}%`;
        boxEl.style.height = `${(box[3] - box[1]) * 100}%`;

        // boxEl.innerHTML = `${label}: ${score}`;

        boxesEl.appendChild(boxEl);
      });
      imgEl.removeEventListener("load", drawBoxes);
    }

    imgEl.addEventListener("load", drawBoxes);
    imgEl.src = `${DetailOverlay.IMG_URL}/${data.id}.jpg`;

    data.color_palette.forEach(([r, g, b]) => {
      const colorEl = document.createElement("div");
      colorEl.classList.add("overlay--colors--box");
      colorEl.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      colorsEl.appendChild(colorEl);
    });

    titleEl.innerHTML = `${data.title} (${yearText})<br>${creatorText}`;
    collectionEl.innerHTML = `${data.museum}`;
    linkEl.setAttribute("href", data.url);
  }
}
