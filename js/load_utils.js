const OBJ_THOLDS = {
  bird: 0,
  dog: 0,
  horse: 0,
  ox: 0,
  bush: 0,
  crops: 0,
  flower: 0,
  fruit: 0,
  grass: 0,
  greenery: 0,
  shrub: 0,
  tree: 0,
  vegetation: 0,
  conifer: 0,
  "palm tree": 0,
};

async function fetchData(mUrl) {
  const response = await fetch(mUrl);
  return await response.json();
}

function createMenuData(metaData, clusterData) {
  const menuData = {
    categories: {},
    collections: {},
    objects: {},
    clusters: []
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

  for (const labelList of clusterData[8].clusters.descriptions.gemma3.pt) {
    menuData.clusters.push({
      label: labelList.join(", "),
      idxs: []
    });
  }

  for (const [id, { cluster, distances }] of Object.entries(clusterData[8].images)) {
    menuData.clusters[cluster].idxs.push(id);
  }

  return menuData;
}
