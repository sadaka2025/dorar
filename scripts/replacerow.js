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

console.log("Chemin du fichier:", filePath);

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Erreur lecture fichier:", err);
    return;
  }
  console.log("Fichier lu avec succès, taille:", data.length, "caractères");

  try {
    const jsonArray = JSON.parse(data);
    console.log("JSON parsé avec succès, nombre d'éléments:", jsonArray.length);

    const updatedArray = jsonArray.map((item) => ({
      ...item,
      thumbnail: "/PDFs/nahw/3.jpg",
    }));

    fs.writeFile(
      filePath,
      JSON.stringify(updatedArray, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Erreur écriture fichier:", err);
        } else {
          console.log("Toutes les thumbnails ont été mises à jour !");
        }
      },
    );
  } catch (parseError) {
    console.error("Erreur parsing JSON:", parseError);
  }
});
