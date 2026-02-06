const fs = require("fs");
const path = require("path");

const filePath = path.join(
  "C:",
  "Users",
  "mimod",
  "OneDrive",
  "Bureau",
  "Courses.tv",
  "src",
  "data",
  "dorardata",
  "dorar5",
  "nafahat2.json",
);

// lire le fichier
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// id de départ
const startId = 95;

// renumérotation
const newData = data.map((item, index) => ({
  ...item,
  id: startId + index,
}));

// écriture (écrase le fichier existant)
fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf8");

console.log("✅ IDs renumérotés avec succès à partir de", startId);
