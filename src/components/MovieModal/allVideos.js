// allVideos.js

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
  /* ================= MOTOUN ================= */
  ...motounData.map((v) => ({
    ...v,
    dataset: "motoun",
  })),

  /* ================= NOUR AL YAKINE ================= */
  ...nourData.map((v) => ({
    ...v,
    dataset: "nour",
  })),

  /* ================= MEETINGS ================= */
  ...year1Meetings.map((v) => ({
    ...v,
    dataset: "meeting",
    year: 1,
  })),
  ...year2Meetings.map((v) => ({
    ...v,
    dataset: "meeting",
    year: 2,
  })),
  ...year3Meetings.map((v) => ({
    ...v,
    dataset: "meeting",
    year: 3,
  })),
  ...year4Meetings.map((v) => ({
    ...v,
    dataset: "meeting",
    year: 4,
  })),
  ...year5Meetings.map((v) => ({
    ...v,
    dataset: "meeting",
    year: 5,
  })),

  /* ================= DORAR ================= */
  ...bayanData.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "bayan",
  })),

  ...hikmaData.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "hikma",
  })),

  ...bookDorarData.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "book",
  })),

  // ✅ FIX ICI : séparation claire
  ...nafahat1Data.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "nafahat1",
  })),

  ...nafahat2Data.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "nafahat2",
  })),

  /* ================= BJOMAA ================= */
  ...bjomaaData.map((v) => ({
    ...v,
    dataset: "bjomaa",
  })),

  /* ================= FIQH ================= */
  ...fiqhData.map((v) => ({
    ...v,
    dataset: "fiqh",
  })),
];
