import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { setSelectedGenre } from "../../redux/reducers/selectedGenresSlice";
import data from "../../data/dorardata/dorar6/dataDrV.json";

export default function TitleLibrary() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [activeTheme, setActiveTheme] = useState("all");

  // 🔎 Extraction propre des vidéos
  const videos = (data.entries || data.videos || []).filter(
    (v) => v.id && v.title,
  );

  // 🧠 Détection automatique thème / sourate depuis le titre
  const detectTheme = (title) => {
    if (title.includes("الفاتحة")) return "الفاتحة";
    if (title.includes("الإخلاص")) return "الإخلاص";
    if (title.includes("الفلق")) return "الفلق";
    if (title.includes("الصف")) return "الصف";
    if (title.includes("يس")) return "يس";
    if (title.includes("هود")) return "هود";
    if (title.includes("موسى")) return "قصص الأنبياء";
    if (title.includes("إعجاز")) return "الإعجاز";
    return "عام";
  };

  // 📂 Enrichissement des données
  const enrichedVideos = useMemo(() => {
    return videos.map((v) => ({
      ...v,
      theme: detectTheme(v.title),
    }));
  }, [videos]);

  // 🔍 Recherche + filtre
  const filteredVideos = enrichedVideos.filter((v) => {
    const matchSearch = v.title.includes(search);
    const matchTheme = activeTheme === "all" || v.theme === activeTheme;
    return matchSearch && matchTheme;
  });

  // 📂 Liste unique des thèmes
  const themes = ["all", ...new Set(enrichedVideos.map((v) => v.theme))];

  return (
    <div className={dark ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="p-4 max-w-5xl mx-auto">
        {/* 🌙 Dark mode + Retour */}
        <div className="flex justify-between items-center mb-4 gap-2">
          <h2
            className="text-xl font-bold"
            style={{
              fontFamily: "'Arabic Typesetting', serif",
              fontSize: "26px",
              padding: "0.75rem",
              color: "red", // couleur par défaut
              transition: "color 0.3s", // animation douce au survol
            }}
          >
            📚 ابداعات الدكتور فاضل السامرائي انقر عنوان للمشاهدة (
            {videos.length})
          </h2>

          <div className="flex gap-2">
            {/* Bouton Dark/Light */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded border"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Bouton Retour au bouton parent */}
            <button
              onClick={() =>
                dispatch(
                  setSelectedGenre({
                    id: "dorar",
                    title: "إيضاح المعاني على رسالة القيراوني",
                    source: "bayan", // ← parent spécifique
                  }),
                )
              }
              className="px-3 py-1 rounded-xl shadow-lg font-semibold transition-transform hover:scale-105 bg-gradient-to-r from-[#D4AF37] to-[#b78e2a] text-black mb-4"
            >
              ← Retour
            </button>
          </div>
        </div>

        {/* 🔍 Recherche */}
        <input
          type="text"
          placeholder="🔍 ابحث في العناوين..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded border text-black"
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            fontSize: "26px",
            padding: "0.75rem",
            color: "red", // couleur par défaut
            transition: "color 0.3s", // animation douce au survol
          }}
        />

        {/* 📂 Filtres thèmes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`px-3 py-1 rounded text-sm border ${
                activeTheme === theme
                  ? "bg-blue-600 text-white"
                  : "bg-transparent"
              }`}
            >
              {theme === "all" ? "الكل" : theme}
            </button>
          ))}
        </div>

        {/* 📜 LISTE COMPLÈTE */}
        <ul className="space-y-2 list-decimal pl-8">
          {filteredVideos.map((video) => (
            <li key={video.id}>
              <span
                className="hover:underline text-blue-500 cursor-pointer"
                style={{
                  fontFamily: "'Arabic Typesetting', serif",
                  fontSize: "30px",
                  padding: "0.75rem",
                  // color: "white", // couleur par défaut
                  transition: "color 0.3s", // animation douce au survol
                }}
                onClick={() =>
                  dispatch(showMovie({ ...video, dataset: "dorar" }))
                }
              >
                {video.title}
              </span>
              <div className="text-xs opacity-70 mt-1">
                🎧 استماع | 📂 {video.theme}
              </div>
            </li>
          ))}
        </ul>

        {filteredVideos.length === 0 && (
          <p className="mt-6 text-center opacity-70">لا توجد نتائج</p>
        )}
      </div>
    </div>
  );
}
