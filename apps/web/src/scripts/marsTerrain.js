const PALETTES = {
  spirit: {
    soil: ["#A84C2C", "#B65330", "#AD502E", "#98452B"], soilLight: "#CD6C3C", soilDark: "#7F3827", dust: "#D57A43", dustLight: "#E99C55",
    stone: "#67413A", stoneTop: "#A16E52", stoneMid: "#815247", stoneDark: "#3D292B", shadow: "#633021", crater: "#733826",
    craterLight: "#D17B45", equipment: "#D9D7CA", screen: "#74D7F1"
  },
  opportunity: {
    soil: ["#927259", "#96765E", "#866951", "#9F7D60"], soilLight: "#B39572", soilDark: "#695343", dust: "#B89A75", dustLight: "#DBC19A",
    stone: "#A58B71", stoneTop: "#E0C8A3", stoneMid: "#B79B7B", stoneDark: "#695B52", shadow: "#5A4941", crater: "#6B5648",
    craterLight: "#CBB08D", equipment: "#DDD8C5", screen: "#8AD2E5", hematite: "#45474C"
  }
};

function noise(x, y, seed = 0) {
  let n = Math.imul(x + 101, 374761393);
  n = (n + Math.imul(y + 173, 668265263)) | 0;
  n ^= Math.imul(seed + 1, 1274126177);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

export function createMarsTerrainRenderer(ctx, map, TS = 16) {
  if (TS !== 16) throw new Error("El renderizador requiere tiles de 16x16.");
  const TILE = 16;
  const rect = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(Math.floor(x), Math.floor(y), w, h); };

  function drawSpiritCrater(X, Y) {
    const p = PALETTES.spirit;
    rect(X + 3, Y + 5, 10, 6, p.craterLight); rect(X + 2, Y + 7, 12, 5, p.soilDark); rect(X + 4, Y + 7, 8, 4, p.crater);
    rect(X + 5, Y + 9, 6, 2, p.shadow); rect(X + 4, Y + 5, 6, 1, p.dustLight); rect(X + 6, Y + 12, 5, 1, p.dust);
  }
  function drawSpiritGround(x, y, X, Y) {
    const p = PALETTES.spirit;
    const region = noise(Math.floor(x / 5), Math.floor(y / 4), 4);
    rect(X, Y, TILE, TILE, p.soil[Math.floor(noise(x, y, 1) * 4)]);
    if (region > 0.63) { rect(X, Y + 2, 16, 8, p.soilLight); rect(X, Y + 9, 16, 3, p.dust); }
    if (y % 3 === 0) rect(X, Y + 13, 16, 2, p.soilDark);
    for (let i = 0; i < 5; i += 1) rect(X + Math.floor(noise(x, y, i + 20) * 14), Y + Math.floor(noise(x, y, i + 40) * 14), 2, 1, i % 2 ? p.soilDark : p.dust);
    if (noise(x, y, 70) > 0.76) { const px = 3 + Math.floor(noise(x, y, 71) * 7); rect(X + px + 1, Y + 10, 5, 2, p.shadow); rect(X + px, Y + 8, 4, 3, p.stone); rect(X + px, Y + 8, 2, 1, p.stoneTop); }
    if (noise(x, y, 80) > 0.967) drawSpiritCrater(X, Y);
  }
  function drawSpiritBoulder(X, Y, x, y) {
    const p = PALETTES.spirit; const variant = Math.floor(noise(x, y, 100) * 3);
    rect(X + 3, Y + 13, 13, 3, p.shadow);
    if (variant === 0) { rect(X + 2, Y + 7, 12, 7, p.stoneDark); rect(X + 3, Y + 4, 10, 9, p.stone); rect(X + 5, Y + 2, 7, 7, p.stoneMid); rect(X + 5, Y + 2, 5, 2, p.stoneTop); rect(X + 10, Y + 7, 3, 4, p.stoneDark); rect(X + 5, Y + 10, 4, 2, p.stoneDark); }
    else if (variant === 1) { rect(X + 1, Y + 8, 14, 6, p.stoneDark); rect(X + 3, Y + 5, 11, 8, p.stone); rect(X + 5, Y + 3, 7, 5, p.stoneMid); rect(X + 5, Y + 3, 4, 2, p.stoneTop); rect(X + 11, Y + 8, 3, 3, p.stoneDark); }
    else { rect(X + 2, Y + 8, 13, 6, p.stoneDark); rect(X + 4, Y + 5, 9, 8, p.stone); rect(X + 6, Y + 3, 5, 7, p.stoneTop); rect(X + 9, Y + 5, 4, 5, p.stoneMid); rect(X + 3, Y + 11, 5, 2, p.stoneDark); }
  }
  function drawSpiritDustPatch(X, Y, x, y) {
    const p = PALETTES.spirit; rect(X, Y, 16, 16, p.dust); rect(X, Y + 5, 16, 2, p.dustLight); rect(X + 2, Y + 3, 7, 2, p.dustLight); rect(X + 8, Y + 10, 8, 2, p.soilLight); rect(X, Y + 14, 16, 2, p.soilDark);
    for (let i = 0; i < 4; i += 1) rect(X + Math.floor(noise(x, y, 120 + i) * 14), Y + Math.floor(noise(x, y, 130 + i) * 12), 2, 1, p.soilDark);
  }
  function drawSpiritRidge(X, Y, x, y) {
    const p = PALETTES.spirit; rect(X, Y + 5, 16, 10, p.stoneDark); rect(X, Y + 4, 16, 4, p.stoneMid); rect(X, Y + 4, 16, 2, p.stoneTop); rect(X, Y + 9, 16, 3, p.stone); rect(X, Y + 14, 16, 2, p.shadow);
    if (noise(x, y, 140) > 0.5) { rect(X + 5, Y + 7, 2, 5, p.stoneDark); rect(X + 11, Y + 10, 3, 2, p.stoneTop); }
  }
  function drawSpiritTile(x, y) {
    const cell = map[y]?.[x]; if (cell == null) return; const X = x * TILE, Y = y * TILE; drawSpiritGround(x, y, X, Y);
    if (cell === "#") drawSpiritBoulder(X, Y, x, y); else if (cell === ",") drawSpiritDustPatch(X, Y, x, y); else if (cell === "=") drawSpiritRidge(X, Y, x, y); else if (cell === "W") drawScientificEquipment(X, Y, "spirit");
  }

  function drawOpportunityGround(x, y, X, Y) {
    const p = PALETTES.opportunity; const region = noise(Math.floor(x / 7), Math.floor(y / 5), 200); rect(X, Y, 16, 16, p.soil[Math.floor(noise(x, y, 201) * 4)]);
    if (region > 0.57) rect(X, Y + 3, 16, 10, p.dust);
    const wave = Math.floor(Math.sin(x * 0.52 + y * 0.24) * 2);
    if (region > 0.42) { rect(X, Y + 6 + wave, 16, 2, p.dustLight); rect(X, Y + 8 + wave, 16, 1, p.soilDark); }
    for (let i = 0; i < 3; i += 1) if (noise(x, y, 210 + i) > 0.62) { const px = Math.floor(noise(x, y, 220 + i) * 14), py = Math.floor(noise(x, y, 230 + i) * 14); rect(X + px, Y + py, 2, 2, p.hematite); rect(X + px, Y + py, 1, 1, "#777C7E"); }
    if (noise(x, y, 250) > 0.7) { rect(X + 3, Y + 12, 4, 1, p.soilLight); rect(X + 10, Y + 3, 3, 1, p.soilDark); }
  }
  function drawOpportunityOutcrop(X, Y, x, y) {
    const p = PALETTES.opportunity; const variant = Math.floor(noise(x, y, 300) * 3); rect(X + 2, Y + 13, 14, 3, p.shadow); rect(X + 1, Y + 6, 14, 8, p.stoneDark); rect(X + 2, Y + 4, 12, 9, p.stoneMid); rect(X + 3, Y + 2, 10, 5, p.stoneTop); rect(X + 3, Y + 6, 10, 2, p.stone); rect(X + 2, Y + 9, 12, 1, p.stoneDark); rect(X + 4, Y + 11, 9, 1, p.dustLight);
    if (variant === 0) { rect(X + 5, Y + 3, 5, 1, "#F1D8B0"); rect(X + 8, Y + 8, 4, 1, p.stoneTop); } else if (variant === 1) { rect(X + 3, Y + 5, 4, 1, p.dustLight); rect(X + 10, Y + 10, 3, 1, p.stoneDark); } else { rect(X + 6, Y + 2, 5, 2, p.dustLight); rect(X + 4, Y + 10, 3, 1, p.stoneTop); }
    if (noise(x, y, 310) > 0.38) { rect(X + 6, Y + 8, 2, 2, p.hematite); rect(X + 11, Y + 11, 2, 1, p.hematite); }
  }
  function drawOpportunityRipples(X, Y, x, y) {
    const p = PALETTES.opportunity; rect(X, Y, 16, 16, p.dust); rect(X, Y + 3, 16, 2, p.dustLight); rect(X, Y + 5, 16, 2, p.soilDark); rect(X, Y + 10, 16, 2, p.dustLight); rect(X, Y + 12, 16, 2, p.soilDark);
    for (let i = 0; i < 3; i += 1) rect(X + Math.floor(noise(x, y, 330 + i) * 14), Y + Math.floor(noise(x, y, 340 + i) * 14), 2, 1, p.hematite);
  }
  function drawOpportunityStrata(X, Y, x, y) {
    const p = PALETTES.opportunity; rect(X, Y + 5, 16, 10, p.stoneDark); rect(X, Y + 4, 16, 4, p.stoneTop); rect(X, Y + 8, 16, 2, p.stoneMid); rect(X, Y + 11, 16, 2, p.stone); rect(X, Y + 14, 16, 2, p.shadow);
    if (noise(x, y, 350) > 0.45) { rect(X + 5, Y + 6, 1, 4, p.stoneDark); rect(X + 6, Y + 10, 3, 1, p.stoneDark); } if (noise(x, y, 351) > 0.5) { rect(X + 10, Y + 5, 2, 1, p.dustLight); rect(X + 11, Y + 8, 1, 3, p.stoneDark); }
  }
  function drawOpportunityTile(x, y) {
    const cell = map[y]?.[x]; if (cell == null) return; const X = x * TILE, Y = y * TILE; drawOpportunityGround(x, y, X, Y);
    if (cell === "#") drawOpportunityOutcrop(X, Y, x, y); else if (cell === ",") drawOpportunityRipples(X, Y, x, y); else if (cell === "=") drawOpportunityStrata(X, Y, x, y); else if (cell === "W") drawScientificEquipment(X, Y, "opportunity");
  }
  function drawScientificEquipment(X, Y, missionType) {
    const p = PALETTES[missionType]; rect(X + 3, Y + 14, 12, 2, p.shadow); rect(X + 1, Y + 3, 14, 11, p.stoneDark); rect(X + 2, Y + 2, 12, 11, p.equipment); rect(X + 3, Y + 3, 10, 2, "#FFFFFF"); rect(X + 4, Y + 5, 8, 5, "#263A43"); rect(X + 5, Y + 6, 6, 3, p.screen); rect(X + 6, Y + 6, 2, 1, "#E9FFFF"); rect(X + 3, Y + 12, 10, 2, p.stone);
  }

  return { drawSpiritTile, drawOpportunityTile };
}
