const fs = require("fs");
const path = require("path");
const { getTranscript } = require("youtube-transcript");

const inputPath = path.join(
  __dirname,
  "../src/data/dorardata/dorar6/data.json",
);
const outputPath = path.join(
  __dirname,
  "../src/data/dorardata/dorar6/data_converted.json",
);

const CONCURRENCY = 5;

// Nettoyage du texte : supprimer doubles espaces, sauts de ligne inutiles
function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\r?\n|\r/g, " ") // remplacer retours à la ligne par espace
    .replace(/\s+/g, " ") // supprimer espaces multiples
    .trim();
}

// Récupérer sous-titres et nettoyer
async function fetchSubtitle(videoId) {
  try {
    const transcript = await getTranscript(videoId, { lang: "ar" });
    const text = transcript.map((t) => t.text).join(" ");
    return cleanText(text);
  } catch (err) {
    console.warn(`⚠️ Pas de sous-titres pour ${videoId} : ${err.message}`);
    return "";
  }
}

// Traiter les vidéos avec contrôle de concurrence
async function processVideos(entries) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < entries.length) {
      const current = index++;
      const video = entries[current];

      let bestThumbnail = null;
      if (video.thumbnails && video.thumbnails.length > 0) {
        bestThumbnail = video.thumbnails.reduce(
          (prev, curr) => (curr.width > (prev?.width || 0) ? curr : prev),
          null,
        );
      }

      // Nettoyer description
      const descriptionClean = cleanText(video.description);

      // Récupérer sous-titres
      const subtitleText = await fetchSubtitle(video.id);

      // Fusion description + sous-titres
      const subtitleCombined = [descriptionClean, subtitleText]
        .filter(Boolean)
        .join("\n\n");

      results[current] = {
        id: video.id,
        title: video.title,
        url: video.url,
        thumbnails: bestThumbnail
          ? [
              {
                url: bestThumbnail.url,
                width: bestThumbnail.width || 480,
                height: bestThumbnail.height || 360,
              },
            ]
          : [],
        subtitle: subtitleCombined,
      };
    }
  }

  const workers = Array.from(
    { length: Math.min(CONCURRENCY, entries.length) },
    worker,
  );
  await Promise.all(workers);
  return results;
}

// Fonction principale
async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error("❌ Fichier introuvable :", inputPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data.entries)) {
    console.error("❌ JSON invalide : pas de entries");
    process.exit(1);
  }

  console.log(`🎥 ${data.entries.length} vidéos à traiter...`);

  const result = await processVideos(data.entries);

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");
  console.log("🎉 Conversion terminée !");
  console.log("📁 Fichier de sortie :", outputPath);
}

main();
