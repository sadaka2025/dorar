import React, { useState, useMemo } from "react";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import MovieModal from "./components/MovieModal/MovieModal";
import { useSelector } from "react-redux";
import { selectMovieModal } from "./redux/reducers/movieModalSlice";
import { selectSelectedGenre } from "./redux/reducers/selectedGenresSlice";
import Movie from "./components/Movie/Movie";
import Scene from "./Visitors/Scene";
import { allVideos } from "./components/MovieModal/allVideos";
import EffetcNewFix from "./Visitors/EffetcNewFix";

function App() {
  const { enabled: movieModalEnabled } = useSelector(selectMovieModal);
  const selectedGenre = useSelector(selectSelectedGenre);

  const [selectedYear, setSelectedYear] = useState(null);
  const years = [1, 2, 3, 4, 5];

  /**
   * ✅ SOURCE UNIQUE DES VIDÉOS
   * Toutes les vidéos viennent de allVideos
   */
  const filteredVideos = useMemo(() => {
    if (!selectedGenre) return [];

    // MEETINGS (avec filtre par année)
    if (selectedGenre.id === "meeting") {
      return allVideos.filter(
        (v) =>
          v.dataset === "meeting" && (!selectedYear || v.year === selectedYear),
      );
    }

    // AUTRES GENRES (motoun, nour, dorar, bjomaa, ...)
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
                fontSize: "24px",
                color: "yellow",
                padding: "1rem",
              }}
            >
              Choisissez une catégorie dans la barre latérale.
            </div>
          )}

          {selectedGenre && (
            <>
              {/* Texte animé */}
              <div className="flex justify-center mb-2">
                <Scene
                  text="صلوا على الحبيب محمد ﷺ ❤️"
                  className="mb-4 font-bold"
                  style={{
                    fontFamily: "'Arabic Typesetting', serif",
                    fontSize: "44px",
                    color: "yellow",
                  }}
                />
              </div>

              <div className="text-center">
                <span className="text-4xl">
                  👇
                  <EffetcNewFix
                    text={`🌿 ${selectedGenre.title}`}
                    className="mb-4 font-bold"
                    style={{
                      fontFamily: "'Arabic Typesetting', serif",
                      fontSize: "44px",
                      color: "yellow",
                    }}
                  />
                  👇
                </span>
              </div>

              {/* Boutons des années (MEETING seulement) */}
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

              {/* Liste des vidéos */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {filteredVideos.map((video) => (
                  <Movie key={video.uid} video={video} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ✅ MODAL UNIQUE (sans wrapper) */}
      {movieModalEnabled && <MovieModal />}
    </div>
  );
}

export default App;
