class CanvasArtWork {
  static IMG_URL = "https://digitais.acervos.at.eu.org/imgs/herbario/arts/100";
  // static IMG_URL = "https://acervos-digitais.github.io/herbario-media/imgs/arts/100";
  static loadedCnt = 0;

  constructor(id, ratio) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.imgUrl = `${CanvasArtWork.IMG_URL}/${id}.jpg`;

    this.w0 = 50;
    this.h0 = parseInt(this.w0 * ratio);
    this.w = this.w0;
    this.h = this.h0;

    this.img = new Image();
    this.img.onload = () => {
      this.w0 = this.img.width;
      this.h0 = this.img.height;
      CanvasArtWork.loadedCnt += 1;
      if (CanvasArtWork.loadedCnt % 50 == 0) console.log(CanvasArtWork.loadedCnt);
    };

    setTimeout(() => {
      this.img.src = `${CanvasArtWork.IMG_URL}/${id}.jpg`;
    }, Math.floor(Math.random() * 1250));
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

    this.allArtWorks = Object.values(metaData).map(x => new CanvasArtWork(x.id, x.image.ratio));

    // TODO: instantiate Drawers

    this.allDrawers = {
      // date: this.dateDrawer,
      // color: this.colorDrawer,
      // cluster: this.clusterDrawer,
      // latent: this.latentDrawer,
      // dateXcolor: this.dateXcolorDrawer
    };
  }

  draw(checked) {
    if (checked in this.allDrawers) {
      this.allDrawers[checked].draw(this.allArtWorks);
    }
    console.log("call", checked, "drawer");
  }
}
