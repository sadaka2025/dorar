import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import MovieModal from "./components/MovieModal/MovieModal";
import Movie from "./components/Movie/Movie";
import MusicPlayer from "./components/MusicPlayer";
import TitleLibrary from "./components/Movie/TitleLibrary"; // ✅ NEW

import { Sparkles } from "lucide-react";

import { selectMovieModal } from "./redux/reducers/movieModalSlice";
import {
  selectSelectedGenre,
  setSelectedGenre,
} from "./redux/reducers/selectedGenresSlice";

import Scene from "./Visitors/Scene";
import EffetcNewFix from "./Visitors/EffetcNewFix";
import { allVideos } from "./components/MovieModal/allVideos";

function App() {
  const dispatch = useDispatch();
  const { enabled: movieModalEnabled } = useSelector(selectMovieModal);
  const selectedGenre = useSelector(selectSelectedGenre);

  const [selectedYear, setSelectedYear] = useState(null);
  const years = [1, 2, 3, 4, 5];

  /* ================= FILTRAGE CENTRAL ================= */
  const filteredVideos = useMemo(() => {
    if (!selectedGenre) return [];

    // 📅 MEETINGS
    if (selectedGenre.id === "meeting") {
      return allVideos.filter(
        (v) =>
          v.dataset === "meeting" && (!selectedYear || v.year === selectedYear),
      );
    }

    // 📚 DORAR
    if (selectedGenre.id === "dorar" && selectedGenre.source) {
      return allVideos.filter(
        (v) => v.dataset === "dorar" && v.source === selectedGenre.source,
      );
    }

    // 📦 AUTRES DATASETS
    return allVideos.filter((v) => v.dataset === selectedGenre.id);
  }, [selectedGenre, selectedYear]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1">
        <SideBar />

        <div className="flex-1 p-4">
          {!selectedGenre && (
            <div
              style={{
                fontFamily: "'Arabic Typesetting', serif",
                fontSize: "26px",
                color: "yellow",
              }}
            >
              اختر قسمًا من القائمة الجانبية
            </div>
          )}

          {selectedGenre && (
            <>
              {/* ===== HEADER ===== */}
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

              {/* ================= DORAR BUTTONS ================= */}
              {selectedGenre.id === "dorar" && (
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
                      openLibrary: true, // ⭐
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
                        selectedGenre.source === btn.source
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-700 text-yellow-400 hover:bg-cyan-700"
                      }`}
                      onClick={() =>
                        dispatch(
                          setSelectedGenre(
                            btn.openLibrary
                              ? {
                                  id: "TitleLibrary", // ✅
                                  title: btn.label,
                                  source: btn.source,
                                }
                              : {
                                  id: "dorar",
                                  title: btn.label,
                                  source: btn.source,
                                },
                          ),
                        )
                      }
                    >
                      <span>{btn.label}</span>
                      {btn.icon && btn.icon}
                    </button>
                  ))}
                </div>
              )}

              {/* ================= YEARS ================= */}
              {selectedGenre.id === "meeting" && (
                <div className="flex justify-center gap-2 mb-4">
                  {years.map((y) => (
                    <button
                      key={y}
                      className={`px-4 py-2 rounded font-bold ${
                        selectedYear === y
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-700 text-yellow-400"
                      }`}
                      onClick={() => setSelectedYear(y)}
                    >
                      السنة {y}
                    </button>
                  ))}
                </div>
              )}

              {/* ================= CONTENT ================= */}
              {/* ================= CONTENT ================= */}
              {selectedGenre.id === "TitleLibrary" ? (
                <div dir="rtl">
                  {" "}
                  {/* ← ajouté pour lecture RTL */}
                  <TitleLibrary /> {/* ✅ LISTE 70 TITRES */}
                </div>
              ) : (
                <div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  dir="rtl"
                >
                  {filteredVideos.map((video) => (
                    <Movie key={`${video.dataset}-${video.id}`} video={video} />
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
