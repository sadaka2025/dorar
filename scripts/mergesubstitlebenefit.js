const fs = require("fs");

// 🔹 Chemins
const videosPath =
  "C:\\Users\\mimod\\OneDrive\\Bureau\\Courses.tv\\public\\data\\dataDrV_with_subtitles.json";

const benefitsPath =
  "C:\\Users\\mimod\\OneDrive\\Bureau\\Courses.tv\\public\\data\\benefits.json";

const outputPath =
  "C:\\Users\\mimod\\OneDrive\\Bureau\\Courses.tv\\public\\data\\finalData.json";

// 🔹 Lecture
const videos = JSON.parse(fs.readFileSync(videosPath, "utf-8"));
const benefits = JSON.parse(fs.readFileSync(benefitsPath, "utf-8"));

// 🔥 Extraire ID YouTube (11 caractères standard)
function extractYouTubeId(text) {
  if (!text) return null;
  const match = text.match(/[a-zA-Z0-9_-]{11}/);
  return match ? match[0] : null;
}

// 🔹 Construire map depuis benefits
const benefitsMap = {};

benefits.forEach((b) => {
  const title = b["العنوان المقترح"];
  const ytId = extractYouTubeId(title);

  if (ytId) {
    benefitsMap[ytId] = b;
  }
});

// 🔹 Fusion
const merged = videos.map((v) => {
  const ytId = v.id;

  return {
    ...v,
    analysis: benefitsMap[ytId] || null,
  };
});

// 🔹 Écriture
fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2), "utf-8");

console.log("✅ finalData.json généré avec matching automatique !");
