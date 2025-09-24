const MENU_LABELS = {
  // general
  all: { en: "All", pt: "Todos" },
  none: { en: "None", pt: "Nenhum" },

  // categories
  drawing: { en: "drawing", pt: "desenho" },
  painting: { en: "painting", pt: "pintura" },

  // objects
  bird: { en: "bird", pt: "pássaro" },
  dog: { en: "dog", pt: "cachorro" },
  horse: { en: "horse", pt: "cavalo" },
  ox: { en: "ox", pt: "boi" },
  "painting of human": { en: "person", pt: "pessoa" },

  bush: { en: "bush", pt: "moita" },
  crops: { en: "crops", pt: "plantação" },
  flower: { en: "flower", pt: "flor" },
  fruit: { en: "fruit", pt: "fruta" },
  grass: { en: "grass", pt: "grama" },
  greenery: { en: "greenery", pt: "folhagem" },
  shrub: { en: "shrub", pt: "arbusto" },
  tree: { en: "tree", pt: "árvore" },
  vegetation: { en: "vegetation", pt: "vegetação" },
  conifer: { en: "conifer", pt: "conífera" },
  "palm tree": { en: "palm tree", pt: "palmeira" },

  "human face": { en: "face", pt: "rosto" },
  "human hand": { en: "hand", pt: "mão" },
  "naked human back": { en: "back", pt: "costas" },
  "naked human breast": { en: "breast", pt: "peito" },
  "naked human buttocks": { en: "gluteous", pt: "nádega" },
  "naked human torso": { en: "torso", pt: "torso" },

  // counter
  available: { en: "Available Works", pt: "Obras Disponíveis" },
  found: { en: "Found Works", pt: "Obras Encontradas" },

  // overlay
  collection: { en: "Collection", pt: "Coleção" },
  untitled: { en: "Untitled", pt: "Sem Título" },
  undated: { en: "N/A", pt: "Sem Data" },
  unauthored: { en: "Unknown", pt: "Autoria não identificada" },
  information: { en: "More Information", pt: "Mais Informações" },
  download: { en: "Download Image", pt: "Baixe Imagem" },
  composition: { en: "Works included in this composition", pt: "Obras utilizadas nessa composição" },
};

function getLabel(l) {
  const lang = window.location.href.includes("en") ? "en" : "pt";
  const hasLabel = l in MENU_LABELS && lang in MENU_LABELS[l] && MENU_LABELS[l][lang] != "";
  if (hasLabel) return MENU_LABELS[l][lang];
  else return l;
}

export { getLabel };
