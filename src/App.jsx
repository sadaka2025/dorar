import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import MovieModal from "./components/MovieModal/MovieModal";
import Movie from "./components/Movie/Movie";
import MusicPlayer from "./components/MusicPlayer";

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

  // ✅ FILTRE CENTRAL UNIQUE
  const filteredVideos = useMemo(() => {
    if (!selectedGenre) return [];

    // 📅 MEETINGS
    if (selectedGenre.id === "meeting") {
      return allVideos.filter(
        (v) =>
          v.dataset === "meeting" && (!selectedYear || v.year === selectedYear),
      );
    }

    // 📚 DORAR (par bouton)
    if (selectedGenre.id === "dorar" && selectedGenre.source) {
      return allVideos.filter(
        (v) => v.dataset === "dorar" && v.source === selectedGenre.source,
      );
    }

    // 📦 AUTRES
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

              {/* 📚 أزرار الدرر (أفقية مثل السنوات) */}
              {selectedGenre.id === "dorar" && (
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                  {[
                    { label: "البيان", source: "bayan" },
                    { label: "الحكمة", source: "hikma" },
                    { label: "درر من الكتب", source: "book" },
                    { label: "النفحات والخواطر", source: "nafahat" },
                  ].map((btn) => (
                    <button
                      key={btn.source}
                      className={`px-5 py-2 rounded font-bold transition ${
                        selectedGenre.source === btn.source
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-700 text-yellow-400 hover:bg-cyan-700"
                      }`}
                      onClick={() =>
                        dispatch(
                          setSelectedGenre({
                            id: "dorar",
                            title: btn.label,
                            source: btn.source,
                          }),
                        )
                      }
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 📅 Boutons années */}
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
                      Année {y}
                    </button>
                  ))}
                </div>
              )}

              {/* 🎬 VIDEOS */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredVideos.map((video) => (
                  <Movie key={video.uid} video={video} />
                ))}
              </div>
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
