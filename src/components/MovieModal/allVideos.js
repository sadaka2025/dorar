// allVideos.js

/* ===================== IMPORTS ===================== */
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
import nafahat3Data from "../../data/dorardata/dorar6/nafahat3.json";

// ✅ NOUVEAUX JSON YT-DLP
import ethraData from "../../data/dorardata/dorar6/dataDrV.json";
import drFadelData from "../../data/dorardata/dorar6/datatharaV.json";
import shortData from "../../data/dorardata/dorar6/datash.json";

import bjomaaData from "../../data/bjomaaData.json";

/* ===================== ADAPTER ===================== */
const normalizeData = (data) => {
  if (Array.isArray(data)) return data;

  if (data && Array.isArray(data.entries)) {
    return data.entries.map((v) => ({
      ...v,
      url: v.url || (v.id ? `https://www.youtube.com/watch?v=${v.id}` : ""),
    }));
  }

  return [];
};

/* ===================== FUSION NAFahat3 ===================== */
const fusedNafahat3Data = [
  ...normalizeData(nafahat3Data), // contenu original
  ...normalizeData(ethraData).map((v) => ({ ...v, sourceChannel: "ethra.a" })),
  ...normalizeData(drFadelData).map((v) => ({
    ...v,
    sourceChannel: "dr.fadelcast",
  })),
  ...normalizeData(shortData).map((v) => ({
    ...v,
    sourceChannel: "ethra.a",
  })),
];

/* ===================== ALL VIDEOS ===================== */
export const allVideos = [
  /* ================= MOTOUN ================= */
  ...normalizeData(motounData).map((v) => ({ ...v, dataset: "motoun" })),

  /* ================= NOUR AL YAKINE ================= */
  ...normalizeData(nourData).map((v) => ({ ...v, dataset: "nour" })),

  /* ================= MEETINGS ================= */
  ...normalizeData(year1Meetings).map((v) => ({
    ...v,
    dataset: "meeting",
    year: 1,
  })),
  ...normalizeData(year2Meetings).map((v) => ({
    ...v,
    dataset: "meeting",
    year: 2,
  })),
  ...normalizeData(year3Meetings).map((v) => ({
    ...v,
    dataset: "meeting",
    year: 3,
  })),
  ...normalizeData(year4Meetings).map((v) => ({
    ...v,
    dataset: "meeting",
    year: 4,
  })),
  ...normalizeData(year5Meetings).map((v) => ({
    ...v,
    dataset: "meeting",
    year: 5,
  })),

  /* ================= DORAR ================= */
  ...normalizeData(bayanData).map((v) => ({
    ...v,
    dataset: "dorar",
    source: "bayan",
  })),
  ...normalizeData(hikmaData).map((v) => ({
    ...v,
    dataset: "dorar",
    source: "hikma",
  })),
  ...normalizeData(bookDorarData).map((v) => ({
    ...v,
    dataset: "dorar",
    source: "book",
  })),
  ...normalizeData(nafahat1Data).map((v) => ({
    ...v,
    dataset: "dorar",
    source: "nafahat1",
  })),
  ...normalizeData(nafahat2Data).map((v) => ({
    ...v,
    dataset: "dorar",
    source: "nafahat2",
  })),

  /* ================= FUSION NAFahat3 ================= */
  ...fusedNafahat3Data.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "nafahat3",
  })),

  /* ================= BJOMAA ================= */
  ...normalizeData(bjomaaData).map((v) => ({ ...v, dataset: "bjomaa" })),

  /* ================= FIQH ================= */
  ...normalizeData(fiqhData).map((v) => ({ ...v, dataset: "fiqh" })),
];
