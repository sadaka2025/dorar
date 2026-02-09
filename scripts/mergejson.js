import { readFile, writeFile } from "fs/promises";

const bayanPath =
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/src/data/dorardata/dorar6/databayan.json";

const drfPath =
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/src/data/dorardata/dorar6/dataDrV.json";

const bayan = JSON.parse(await readFile(bayanPath, "utf8"));
const drf = JSON.parse(await readFile(drfPath, "utf8"));

const merged = {
  ...bayan, // on prend la structure principale
  id: "merged-fadel-channels",
  title: "Dr Fadel – Toutes les chaînes",
  channel: "Dr Fadel (Fusion)",
  playlist_count: (bayan.entries?.length || 0) + (drf.entries?.length || 0),

  entries: [
    ...(bayan.entries || []).map((v) => ({
      ...v,
      source_channel: "lamasat-bayania",
    })),
    ...(drf.entries || []).map((v) => ({
      ...v,
      source_channel: "dr-fadel-bodcast",
    })),
  ],
};

const outputPath =
  "C:/Users/mimod/OneDrive/Bureau/Courses.tv/src/data/dorardata/dorar6/dataMerged.json";

await writeFile(outputPath, JSON.stringify(merged, null, 2));

console.log("✅ Fusion entries OK – compatible React");
