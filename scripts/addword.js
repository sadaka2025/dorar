const fs = require("fs");

// chemin absolu direct (copié depuis Windows)
const filePath =
  "C:\\Users\\mimod\\OneDrive\\Bureau\\Courses.tv\\src\\data\\dorardata\\dorar3\\bookdorar.json";

if (!fs.existsSync(filePath)) {
  console.error("❌ Fichier introuvable ! Vérifie le chemin :", filePath);
  process.exit(1);
}

// lire le fichier
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// mettre à jour toutes les descriptions
const updatedData = data.map((item) => ({
  ...item,
  description: item.description + " شرح و أدلة فقه متن ابن عاشر",
}));

fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
console.log("✅ Toutes les descriptions ont été mises à jour !");
