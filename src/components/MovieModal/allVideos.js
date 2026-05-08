/* ===================== IMPORTS ===================== */
import motounData from "../../data/motoun.json";
import nourData from "../../data/nour-alyakine.json";
import fiqhData from "../../data/fiqh.json";

import year1Meetings from "../../data/yearsmeeting/year1/meetings-flat.json";
import year2Meetings from "../../data/yearsmeeting/year2/meetings-flat.json";
import year3Meetings from "../../data/yearsmeeting/year3/meetings-flat.json";
import year4Meetings from "../../data/yearsmeeting/year4/meetings-flat.json";
import year5Meetings from "../../data/yearsmeeting/year5/meetings-flat.json";

import bayanData from "../../data/dorardata/dorar1/bayan.json";
import hikmaData from "../../data/dorardata/dorar2/hikma.json";
import bookDorarData from "../../data/dorardata/dorar3/bookdorar.json";
import nafahat1Data from "../../data/dorardata/dorar4/nafahat1.json";
import nafahat2Data from "../../data/dorardata/dorar5/nafahat2.json";
import nafahat3Data from "../../data/dorardata/dorar6/nafahat3.json";

import shortData from "../../data/dorardata/dorar6/datash.json";
import bjomaaData from "../../data/bjomaaData.json";

/* ===================== UTILS ===================== */

const normalizeTextField = (value) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "text" in value) return value.text;
  return "";
};

const safeEntries = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.entries)) return data.entries;
  if (Array.isArray(data.videos)) return data.videos;
  if (data.entries) return [data.entries];
  if (data.videos) return [data.videos];
  return [];
};

const normalizeData = (data) =>
  safeEntries(data).map((v) => ({
    ...v,
    title: normalizeTextField(v.title),
    description: normalizeTextField(v.description),
    url: v.url || (v.id ? `https://www.youtube.com/watch?v=${v.id}` : ""),
  }));

/* ===================== DATA DR FADEL (PUBLIC) ===================== */

// ⚠️ synchronisation avec ton TitleLibrary
let drFadelPublicData = [];

try {
  const req = new XMLHttpRequest();
  req.open("GET", "/data/dataDrV_with_subtitles.json", false); // SYNCHRONE
  req.send(null);
  if (req.status === 200) {
    const json = JSON.parse(req.responseText);
    drFadelPublicData = Array.isArray(json) ? json : Object.values(json);
  }
} catch (e) {
  console.warn("Dr Fadel data not loaded yet");
}

/* ===================== FUSION NAFahat3 ===================== */

const fusedNafahat3Data = [
  ...normalizeData(nafahat3Data),

  ...drFadelPublicData.map((v) => ({
    ...v,
    sourceChannel: "dr.fadelcast",
  })),

  ...normalizeData(shortData).map((v) => ({
    ...v,
    sourceChannel: "ethra.a",
  })),

  ...normalizeData(shortData).map((v) => ({
    ...v,
    sourceChannel: "dr.fadelcast",
  })),
];

/* ===================== ALL VIDEOS (COMME AVANT) ===================== */

export const allVideos = [
  ...normalizeData(motounData).map((v) => ({ ...v, dataset: "motoun" })),
  ...normalizeData(nourData).map((v) => ({ ...v, dataset: "nour" })),

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

  ...fusedNafahat3Data.map((v) => ({
    ...v,
    dataset: "dorar",
    source: "nafahat3",
  })),

  ...normalizeData(bjomaaData).map((v) => ({ ...v, dataset: "bjomaa" })),
  ...normalizeData(fiqhData).map((v) => ({ ...v, dataset: "fiqh" })),
];
