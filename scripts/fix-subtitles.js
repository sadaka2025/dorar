const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../public/data/dataDrV_with_subtitles.json"
);

const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

const MAX_TEXT_LENGTH = 8000; // sécurité mémoire

data.forEach((video) => {
  if (typeof video.subtitle === "string") {
    try {
      let fixed = video.subtitle
        .replace(/'/g, '"')
        .replace(/\\u003e/g, ">");

      const subtitleObj = JSON.parse(fixed);

      let text = "";

      if (subtitleObj.events) {
        subtitleObj.events.forEach((ev) => {
          if (ev.segs) {
            ev.segs.forEach((seg) => {
              if (seg.utf8) {
                text += seg.utf8 + " ";
              }
            });
          }
        });
      }

      // Nettoyage final
      text = text
        .replace(/\s+/g, " ")
        .replace(/\\n/g, "\n")
        .trim();

      // Sécurité taille
      if (text.length > MAX_TEXT_LENGTH) {
        text = text.slice(0, MAX_TEXT_LENGTH) + "…";
      }

      video.subtitleText = text;
      delete video.subtitle; // 🔥 on supprime la bombe

    } catch (e) {
      console.log("⚠️ Subtitle ignoré pour ID:", video.id);
      video.subtitleText = "";
      delete video.subtitle;
    }
  }
});

fs.writeFileSync(
  filePath,
  JSON.stringify(data, null, 2),
  "utf8"
);

console.log("✅ Sous-titres convertis en texte simple (safe)");
