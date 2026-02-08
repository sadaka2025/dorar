import { createSlice } from "@reduxjs/toolkit";

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  dataset: null, // "meeting" | "dorar" | ...
  title: null,

  // meeting
  meetingYear: null, // number

  // dorar
  dorarSource: null, // "bayan" | "hikma" | ...
  openLibrary: false, // TitleLibrary
};

/* =========================
   SLICE
========================= */
const selectedGenresSlice = createSlice({
  name: "selectedGenres",
  initialState,
  reducers: {
    /* =====================================
       ✅ COMPATIBILITY (NE PAS SUPPRIMER)
       ===================================== */
    setSelectedGenre(state, action) {
      const p = action.payload;

      // ancien usage : { id, title, source }
      if (p?.id) {
        if (p.id === "TitleLibrary") {
          state.dataset = "dorar";
          state.openLibrary = true;
          state.title = p.title || null;
          state.dorarSource = null;
          state.meetingYear = null;
          return;
        }

        state.dataset = p.id;
        state.title = p.title || null;
        state.dorarSource = p.source || null;
        state.meetingYear = null;
        state.openLibrary = false;
        return;
      }

      Object.assign(state, p);
    },

    /* =====================================
       ✅ MEETING (YEAR SAFE)
       ===================================== */
    setMeetingYear(state, action) {
      state.dataset = "meeting";
      state.meetingYear = Number(action.payload); // 🔑 clé anti-bug
      state.title = `السنة ${action.payload}`;

      // nettoyage
      state.dorarSource = null;
      state.openLibrary = false;
    },

    /* =====================================
       ✅ DORAR
       ===================================== */
    setDorarSource(state, action) {
      state.dataset = "dorar";
      state.dorarSource = action.payload.source;
      state.title = action.payload.title;
      state.meetingYear = null;
      state.openLibrary = false;
    },

    openTitleLibrary(state, action) {
      state.dataset = "dorar";
      state.openLibrary = true;
      state.title = action.payload?.title || null;
      state.dorarSource = null;
      state.meetingYear = null;
    },

    clearSelectedGenre() {
      return initialState;
    },
  },
});

/* =========================
   EXPORTS
========================= */
export const {
  setSelectedGenre, // compat
  setMeetingYear,
  setDorarSource,
  openTitleLibrary,
  clearSelectedGenre,
} = selectedGenresSlice.actions;

export const selectSelectedGenre = (state) => state.selectedGenres;

export default selectedGenresSlice.reducer;
