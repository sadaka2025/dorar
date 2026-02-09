import { readFile, writeFile } from "fs/promises";

const bayanPath =
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/src/data/dorardata/dorar6/datash.json";

const drfPath =
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/src/data/dorardata/dorar6/dataDrV.json";

const bayan = JSON.parse(await readFile(bayanPath, "utf8"));
const drf = JSON.parse(await readFile(drfPath, "utf8"));

// 🔹 Fonction sécurisée pour récupérer un tableau d'entries
const safeEntries = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data; // si le JSON est déjà un tableau
  if (Array.isArray(data.entries)) return data.entries;
  if (Array.isArray(data.videos)) return data.videos; // au cas où
  return [];
};

const merged = {
  ...bayan, // on prend la structure principale
  id: "merged-fadel-channels",
  title: "Dr Fadel – Toutes les chaînes",
  channel: "Dr Fadel (Fusion)",
  playlist_count: safeEntries(bayan).length + safeEntries(drf).length,

  entries: [
    ...safeEntries(bayan).map((v) => ({
      ...v,
      source_channel: "lamasat-bayania",
    })),
    ...safeEntries(drf).map((v) => ({
      ...v,
      source_channel: "dr-fadel-bodcast",
    })),
  ],
};

const outputPath =
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/src/data/dorardata/dorar6/dataMerged.json";

await writeFile(outputPath, JSON.stringify(merged, null, 2));

console.log("✅ Fusion entries OK – compatible React");
