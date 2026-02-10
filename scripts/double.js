const fs = require("fs");
const path = require("path");

// 🔹 Chemin vers ton fichier JSON
const filePath = path.join(
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/public/data",
  "dataDrV_with_subtitles.json",
);

// 1️⃣ Lire le fichier JSON
const rawData = fs.readFileSync(filePath, "utf-8");
let data = JSON.parse(rawData);

// 2️⃣ Supprimer les doublons d'ID
const seenIds = new Set();
const uniqueData = data.filter((item) => {
  if (seenIds.has(item.id)) {
    return false; // doublon -> supprimer
  } else {
    seenIds.add(item.id);
    return true;
  }
});

// 3️⃣ Écrire le JSON nettoyé
fs.writeFileSync(filePath, JSON.stringify(uniqueData, null, 2), "utf-8");

console.log(`✅ Fini ! ${data.length - uniqueData.length} doublons supprimés.`);
