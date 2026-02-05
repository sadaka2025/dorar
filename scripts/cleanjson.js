// scripts/clean-json.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../src/data/dorardata/dorar6/datashort.json",
);

try {
  // Lire le fichier en binaire
  let raw = fs.readFileSync(filePath);

  // Si BOM UTF-8 présent au début, le retirer
  if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
    raw = raw.slice(3);
  }

  // Convertir en string UTF-8
  const jsonStr = raw.toString("utf8");

  // Parser pour vérifier que c'est du JSON valide
  const data = JSON.parse(jsonStr);

  // Réécrire le fichier en UTF-8 pur (sans BOM)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), {
    encoding: "utf8",
  });

  console.log("✅ JSON nettoyé avec succès :", filePath);
} catch (err) {
  console.error("❌ Erreur lors du nettoyage du JSON :", err);
}
