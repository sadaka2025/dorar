import motounData from "../../data/motoun.json";
import nourData from "../../data/nour-alyakine.json";
import meetingsFlat from "../../data/meetings-flat.json";
import dorarData from "../../data/dorarData.json";
import bjomaaData from "../../data/bjomaaData.json";

export const allVideos = [
  ...motounData.map((v) => ({ ...v, dataset: "motoun" })),
  ...nourData.map((v) => ({ ...v, dataset: "nour" })),
  ...meetingsFlat, // ✅ déjà dataset: "meeting"
  ...dorarData.map((v) => ({ ...v, dataset: "dorar" })),
  ...bjomaaData.map((v) => ({ ...v, dataset: "bjomaa" })),
];
