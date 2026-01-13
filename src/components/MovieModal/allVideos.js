import motounData from "../../data/motoun.json";
import nourData from "../../data/nour-alyakine.json";

import year1Meetings from "../../data/years/year1/meetings-flat.json";
import year2Meetings from "../../data/years/year2/meetings-flat.json";
import year3Meetings from "../../data/years/year3/meetings-flat.json";
import year4Meetings from "../../data/years/year4/meetings-flat.json";
import year5Meetings from "../../data/years/year5/meetings-flat.json";

import dorarData from "../../data/dorarData.json";
import bjomaaData from "../../data/bjomaaData.json";

export const allVideos = [
  // ================= AUTRES CONTENUS =================
  ...motounData.map((v) => ({ ...v, dataset: "motoun" })),
  ...nourData.map((v) => ({ ...v, dataset: "nour" })),

  // ================= MEETINGS PAR ANNÉE =================
  ...year1Meetings.map((v) => ({ ...v, dataset: "meeting", year: 1 })),
  ...year2Meetings.map((v) => ({ ...v, dataset: "meeting", year: 2 })),
  ...year3Meetings.map((v) => ({ ...v, dataset: "meeting", year: 3 })),
  ...year4Meetings.map((v) => ({ ...v, dataset: "meeting", year: 4 })),
  ...year5Meetings.map((v) => ({ ...v, dataset: "meeting", year: 5 })),

  // ================= AUTRES =================
  ...dorarData.map((v) => ({ ...v, dataset: "dorar" })),
  ...bjomaaData.map((v) => ({ ...v, dataset: "bjomaa" })),
];
