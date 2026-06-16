import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import MovieModal from "./components/MovieModal/MovieModal";
import Movie from "./components/Movie/Movie";
import MusicPlayer from "./components/MusicPlayer";
import TitleLibrary from "./components/Movie/TitleLibrary";

import { Sparkles } from "lucide-react";

import { selectMovieModal } from "./redux/reducers/movieModalSlice";
import {
  selectSelectedGenre,
  setMeetingYear,
  setDorarSource,
  openTitleLibrary,
} from "./redux/reducers/selectedGenresSlice";

import Scene from "./Visitors/Scene";
import EffetcNewFix from "./Visitors/EffetcNewFix";
import { allVideos } from "./components/MovieModal/allVideos";

/* =====================================================
   📦 PREPARE DATA ONCE (ULTRA CLEAN)
===================================================== */
const meetingByYear = {};
const dorarBySource = {};

allVideos.forEach((v) => {
  if (v.dataset === "meeting") {
    const y = Number(v.year);
    meetingByYear[y] ??= [];
    meetingByYear[y].push(v);
  }

  if (v.dataset === "dorar") {
    dorarBySource[v.source] ??= [];
    dorarBySource[v.source].push(v);
  }
});

/* ordre stable */
Object.values(meetingByYear).forEach((arr) =>
  arr.sort((a, b) => Number(a.id) - Number(b.id)),
);
Object.values(dorarBySource).forEach((arr) =>
  arr.sort((a, b) => Number(a.id) - Number(b.id)),
);

function App() {
  const dispatch = useDispatch();
  const { enabled: movieModalEnabled } = useSelector(selectMovieModal);
  const selectedGenre = useSelector(selectSelectedGenre);

  const years = [1, 2, 3, 4, 5];
  const activeDataset = selectedGenre?.dataset || "meeting";

  /* ================= CONTENT SOURCE ================= */
  const videos = useMemo(() => {
    if (activeDataset === "meeting") {
      return meetingByYear[selectedGenre?.meetingYear || 1] || [];
    }

    if (activeDataset === "dorar") {
      return dorarBySource[selectedGenre?.dorarSource] || [];
    }

    return allVideos
      .filter((v) => v.dataset === activeDataset)
      .sort((a, b) => Number(a.id) - Number(b.id));
  }, [selectedGenre]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1 flex-row-reverse">
        <SideBar />

        <div className="flex-1 p-4">
          {selectedGenre?.dataset && (
            <>
              {/* HEADER */}
              <div className="flex justify-center mb-3">
                <Scene
                  text="صلوا على الحبيب محمد ﷺ ❤️"
                  style={{
                    fontFamily: "'Arabic Typesetting', serif",
                    fontSize: "44px",
                    color: "yellow",
                  }}
                />
              </div>

              <div className="text-center mb-4">
                <EffetcNewFix
                  text={`🌿 ${selectedGenre.title}`}
                  as="h2"
                  size="44px"
                  fontFamily="'Arabic Typesetting', serif"
                />
              </div>

              {/* DORAR */}
              {selectedGenre.dataset === "dorar" && (
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                  {[
                    {
                      label: "إيضاح المعاني على رسالة القيراوني",
                      source: "bayan",
                    },
                    {
                      label: "قواعد الفقه المالكي على قضايا معاصرة",
                      source: "hikma",
                    },
                    {
                      label: "أدلة فقه متن ابن عاشر",
                      source: "book",
                    },
                    {
                      label: "مراجع كتب ابداع الدكتور فاضل السامرائي",
                      source: "nafahat1",
                    },
                    {
                      label: "روائع البيان القرآني",
                      source: "nafahat2",
                    },
                    {
                      label: "ابداع الدكتور فاضل السامرائي",
                      source: "nafahat3",
                      icon: (
                        <Sparkles size={22} className="ml-2 text-yellow-300" />
                      ),
                      openLibrary: true,
                    },
                  ].map((btn) => (
                    <button
                      key={btn.source}
                      style={{
                        fontFamily: "'Arabic Typesetting', serif",
                        fontSize: "24px",
                        padding: "1rem",
                        lineHeight: "0.9",
                      }}
                      className={`px-5 py-2 rounded font-bold transition flex items-center justify-center gap-2 ${
                        selectedGenre.dorarSource === btn.source
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-700 text-yellow-400 hover:bg-cyan-700"
                      }`}
                      onClick={() => {
                        if (btn.openLibrary) {
                          dispatch(openTitleLibrary({ title: btn.label }));
                        } else {
                          dispatch(
                            setDorarSource({
                              source: btn.source,
                              title: btn.label,
                            }),
                          );
                        }
                      }}
                    >
                      <span>{btn.label}</span>
                      {btn.icon && btn.icon}
                    </button>
                  ))}
                </div>
              )}

              {/* YEARS */}
              {/* YEARS */}
              {selectedGenre.dataset === "meeting" && (
                <div className="flex justify-center gap-2 mb-4">
                  {[...years].reverse().map((y) => (
                    <button
                      key={y}
                      className={`px-4 py-2 rounded font-bold ${
                        selectedGenre.meetingYear === y
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-700 text-yellow-400"
                      }`}
                      onClick={() => dispatch(setMeetingYear(y))}
                    >
                      السنة {y}
                    </button>
                  ))}
                </div>
              )}

              {/* CONTENT */}
              {selectedGenre.openLibrary ? (
                <div dir="rtl">
                  <TitleLibrary />
                </div>
              ) : (
                <div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  dir="rtl"
                >
                  {videos.map((video) => (
                    <Movie
                      key={`${video.dataset}-${video.year}-${video.id}`}
                      video={video}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {movieModalEnabled && <MovieModal />}
      <MusicPlayer />
    </div>
  );
}

export default App;
