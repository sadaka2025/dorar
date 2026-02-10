const fs = require("fs");
const path = require("path");

const filePath = path.join(
  "C:",
  "Users",
  "mimod",
  "OneDrive",
  "Bureau",
  "Courses.tv",
  "public",
  "data",
  "dataDrV_with_subtitles.json",
);

const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

// ✅ تحقق أن الجذر Array
if (!Array.isArray(data)) {
  console.error("❌ Le JSON racine n'est pas un tableau");
  process.exit(1);
}

// عناوين عامة
const genericTitleRegex = /^فيديو\s*(قصير)?\s*\d*$/i;

// كلمات غير دالة
const stopWords = [
  "هذا",
  "هذه",
  "في",
  "من",
  "على",
  "الى",
  "أن",
  "قال",
  "يعني",
  "اه",
  "نعم",
  "لا",
  "هو",
];

function buildTitleFromSubtitle(text = "") {
  const words = text
    .replace(/[^\u0600-\u06FF\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.includes(w));

  return [...new Set(words)].slice(0, 6).join(" ");
}

let updated = 0;

data.forEach((video, index) => {
  if (video.title && genericTitleRegex.test(video.title)) {
    const newTitle = buildTitleFromSubtitle(video.subtitle);

    video.title = newTitle ? `🎥 ${newTitle}` : `🎥 محتوى فيديو ${index + 1}`;

    updated++;
  }
});

const outputPath = filePath.replace(".json", "_titles_fixed.json");

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

console.log(`✅ Titres modifiés : ${updated}`);
console.log(`📁 Fichier généré : ${outputPath}`);
