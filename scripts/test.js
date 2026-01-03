const fs = require("fs");
const path = require("path");

// chemin vers ton fichier JSON existant dans src/data
const inputFile = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "nour-alyakine.json"
);
const outputFile = path.join(
  __dirname,
  "..",
  "src",

  "data",
  "nour-alyakine_updated.json"
);

// lire le JSON
const rawData = fs.readFileSync(inputFile, "utf8");
const videos = JSON.parse(rawData);

// ajouter les champs automatiquement
const updatedVideos = videos.map((video) => {
  // créer un nom de fichier basé sur l'id pour être unique
  const basePdfName = String(video.id).replace(/\s+/g, "_"); // remplace espaces par _
  return {
    ...video,
    textPdf: `/PDFs/${basePdfName}_text.pdf`,
    fawaaidPdf: `/PDFs/${basePdfName}_fawaaid.pdf`,
  };
});

// écrire le nouveau JSON
fs.writeFileSync(outputFile, JSON.stringify(updatedVideos, null, 2), "utf8");

console.log(`✅ JSON mis à jour avec textPdf et fawaaidPdf dans ${outputFile}`);
