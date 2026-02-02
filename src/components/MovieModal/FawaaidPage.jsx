import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedGenre } from "../../redux/reducers/selectedGenresSlice";
import Movie from "./Movie";

// Couleurs personnalisées pour chaque année
const yearColors = {
  1: "bg-yellow-500",
  2: "bg-cyan-500",
  3: "bg-green-500",
  4: "bg-orange-500",
  5: "bg-pink-500",
};
const dorarColors = {
  1: "bg-yellow-500",
  2: "bg-cyan-500",
  3: "bg-green-500",
  4: "bg-orange-500",
  5: "bg-pink-500",
};

export default function FawaaidPage() {
  const selectedGenre = useSelector(selectSelectedGenre);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selecteddDorar, setSelectedDorar] = useState(null);

  if (!selectedGenre)
    return (
      <div
        style={{
          fontFamily: "'Arabic Typesetting', serif",
          fontSize: "24px",
          color: "yellow",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        Choisissez une catégorie dans la barre latérale.
      </div>
    );

  const years = [1, 2, 3, 4, 5];

  const filteredVideos =
    selectedGenre.id === "meeting" && selectedYear
      ? selectedGenre.videos.filter((v) => v.year === selectedYear)
      : selectedGenre.videos;

  const filteredVideosD =
    selectedGenre.id === "Dorars" && selectedYear
      ? selectedGenre.videos.filter((v) => v.dorar === selectedYear)
      : selectedGenre.videos;

  const dorars = [1, 2, 3, 4, 5];

  const filteredDorars =
    selectedGenre.id === "dorars" && selecteddDorar
      ? selectedGenre.videos.filter((v) => v.dorar === selecteddDorar)
      : selectedGenre.videos;

  return (
    <div className="flex-1 p-4 flex flex-col items-center">
      {/* Titre centré */}
      <h2
        style={{
          fontFamily: "'Arabic Typesetting', serif",
          fontSize: "32px",
          color: "yellow",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {selectedGenre.title}
      </h2>

      {/* Navbar des années pour "meeting" */}
      {selectedGenre.id === "meeting" && (
        <div className="flex justify-center gap-4 mb-6">
          {years.map((y) => (
            <button
              key={y}
              className={`px-4 py-2 rounded ${
                selectedYear === y
                  ? `${yearColors[y]} text-white`
                  : "bg-gray-700 text-yellow-400"
              }`}
              onClick={() => setSelectedYear(y)}
            >
              Année {y}
            </button>
          ))}
        </div>
      )}
      {/* Navbar des années pour "dorars" */}
      {selectedGenre.id === "dorars" && (
        <div className="flex justify-center gap-4 mb-6">
          {dorars.map((y) => (
            <button
              key={y}
              className={`px-4 py-2 rounded ${
                selecteddDorar === y
                  ? `${dorarColors[y]} text-white`
                  : "bg-gray-700 text-yellow-400"
              }`}
              onClick={() => setSelectedDorar(y)}
            >
              Année {y}
            </button>
          ))}
        </div>
      )}

      {/* Liste des vidéos centrée */}
      <div className="grid grid-cols-2 gap-6 justify-items-center">
        {filteredVideos.map((video, i) => (
          <Movie key={i} video={video} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 justify-items-center">
        {filteredVideosD.map((video, i) => (
          <Movie key={i} video={video} />
        ))}
      </div>
    </div>
  );
}
