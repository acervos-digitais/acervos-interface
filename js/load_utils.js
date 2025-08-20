const OBJ_THOLDS = {
  bird: 0,
  dog: 0,
  horse: 0,
  ox: 1,
  "painting of human": 0,
  bush: 0,
  flower: 0,
  fruit: 0,
  grass: 0,
  greenery: 0,
  shrub: 0,
  tree: 0,
  vegetation: 0,
  conifer: 0,
  "palm tree": 0,
  "human face": 0,
  "human hand": 0,
  "naked human back": 1,
  "naked human breast": 1,
  "naked human buttocks": 1,
  "naked human torso": 0,
};

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}

function pruneCollections(menuData, thold=10) {
  menuData.collections = Object.entries(menuData.collections).reduce((acc, [k, v]) => {
    if (v.length >= thold && !k.includes("Religiosa e Tradicional")) {
      acc[k] = v;
    }

    return acc;
  }, {});
  return menuData;
}

function createMenuData(metaData, clusterData) {
  const menuData = {
    categories: {},
    collections: {},
    clusters: [],
    dates: {},
    objects: {},
  };
  
  for (const id of Object.keys(metaData)) {
    const item = metaData[id];
    const col = item.museum;

    item.objects = item.objects.filter(o => o.score > OBJ_THOLDS[o.label]);

    if (!(col in menuData.collections)) {
      menuData.collections[col] = [];
    }
    menuData.collections[col].push(id);

    for (const cat of item.categories) {
      if (!(cat in menuData.categories)) {
        menuData.categories[cat] = [];
      }
      menuData.categories[cat].push(id);
    }

    for (const obj of item.objects) {
      if (!(obj.label in menuData.objects)) {
        menuData.objects[obj.label] = [];
      }
      menuData.objects[obj.label].push(id);
    }
  }

  const lang = window.location.href.includes("en") ? "en" : "pt";
  menuData.clusters.labels = clusterData[8].clusters.descriptions.gemma3[lang].map(x => x.join(", "));
  menuData.clusters.ids = new Array(8).fill(null).map(() => []);

  for (const [id, { cluster, distances }] of Object.entries(clusterData[8].images)) {
    menuData.clusters.ids[cluster].push(id);
  }

  const nowYear = new Date().getFullYear();

  Object.entries(metaData).forEach(([id, v]) => metaData[id].year = Math.min(v.year, nowYear + 1));

  const idsYears = Object.values(metaData).map(x => [x.id, x.year]);
  const allYears = idsYears.map(x => x[1]);
  const validYears = allYears.filter(x => x <= nowYear);

  menuData.dates.min = Math.min(...validYears);
  menuData.dates.max = Math.max(...validYears);
  menuData.dates.maxAll = Math.max(...allYears);

  const yearsIds = idsYears.reduce((acc, [id, year]) => {
    if (!(year in acc)) {
      acc[year] = [];
    }
    acc[year].push(`${id}`);
    return acc;
  }, {});

  menuData.dates.yearsIds = Object.entries(yearsIds).map(([year, ids]) => ({ year: parseInt(year), ids })).toSorted((a,b) => a.year - b.year);

  return pruneCollections(menuData);
}

function combineClusterData(metaData, clusterData) {
  for (const id of Object.keys(metaData)) {
    metaData[id].cluster = {
      idx: clusterData[8].images[id].cluster,
      distances: clusterData[8].images[id].distances,
    }
  }
  return metaData;
}

export { fetchData, createMenuData, combineClusterData };
