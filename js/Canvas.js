class CanvasArtWork {
  static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/100";
  // static IMG_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/100";

  constructor(id) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.a = 0;

    this.img = new Image();
    this.img.onload = () => {
      this.w0 = this.img.width;
      this.h0 = this.img.height;
    };

    if (Math.random() > 0.5) {
      this.w0 = 100;
      this.h0 = 50 + Math.floor(Math.random() * 51);
    } else {
      this.w0 = 50 + Math.floor(Math.random() * 51);
      this.h0 = 100;
    }

    setTimeout(() => {
      this.img.src = `${CanvasArtWork.IMG_URL}/${id}.jpg`;
    }, Math.floor(Math.random() * 250));
  }
}

class Canvas {
  constructor(metaData) {
    this.metaData = Object.values(metaData).map(x => {
      const { id, creator, museum, objects, title, url, year } = x;
      return { id, creator, museum, objects, title, url, year };
    }).reduce((acc, v) => {
      acc[v.id] = v;
      return acc;
    }, {});

    this.allArtWorks = Object.values(metaData).map(x => new CanvasArtWork(x.id));
  }

  draw() {
    console.log("called draw()");
  }
}
