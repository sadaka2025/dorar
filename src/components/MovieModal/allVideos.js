import motounData from "../../data/motoun.json";
import nourData from "../../data/nour-alyakine.json";
import fiqhData from "../../data/fiqh.json";

import year1Meetings from "../../data/years/year1/meetings-flat.json";
import year2Meetings from "../../data/years/year2/meetings-flat.json";
import year3Meetings from "../../data/years/year3/meetings-flat.json";
import year4Meetings from "../../data/years/year4/meetings-flat.json";
import year5Meetings from "../../data/years/year5/meetings-flat.json";

import bayanData from "../../data/dorardata/dorar1/bayan.json";
import hikmaData from "../../data/dorardata/dorar2/hikma.json";
import bookDorarData from "../../data/dorardata/dorar3/bookdorar.json";
import nafahat1Data from "../../data/dorardata/dorar4/nafahat1.json";
import nafahat2Data from "../../data/dorardata/dorar5/nafahat2.json";

import bjomaaData from "../../data/bjomaaData.json";

export const allVideos = [
  ...motounData.map((v) => ({ ...v, dataset: "motoun" })),
  ...nourData.map((v) => ({ ...v, dataset: "nour" })),

  ...year1Meetings.map((v) => ({ ...v, dataset: "meeting", year: 1 })),
  ...year2Meetings.map((v) => ({ ...v, dataset: "meeting", year: 2 })),
  ...year3Meetings.map((v) => ({ ...v, dataset: "meeting", year: 3 })),
  ...year4Meetings.map((v) => ({ ...v, dataset: "meeting", year: 4 })),
  ...year5Meetings.map((v) => ({ ...v, dataset: "meeting", year: 5 })),

  ...bayanData.map((v) => ({ ...v, dataset: "dorar", source: "bayan" })),
  ...hikmaData.map((v) => ({ ...v, dataset: "dorar", source: "hikma" })),
  ...bookDorarData.map((v) => ({ ...v, dataset: "dorar", source: "book" })),
  ...nafahat1Data.map((v) => ({ ...v, dataset: "dorar", source: "nafahat" })),
  ...nafahat2Data.map((v) => ({ ...v, dataset: "dorar", source: "nafahat" })),

  ...bjomaaData.map((v) => ({ ...v, dataset: "bjomaa" })),
  ...fiqhData.map((v) => ({ ...v, dataset: "fiqh" })),
];
