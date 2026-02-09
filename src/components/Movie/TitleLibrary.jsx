import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { setSelectedGenre } from "../../redux/reducers/selectedGenresSlice";
import data from "../../data/dorardata/dorar6/dataDrV.json";
import FiqhDetailsModal from "../MovieModal/FiqhDetailsModal"; // ✅ modal

export default function TitleLibrary() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [activeTheme, setActiveTheme] = useState("all");
  const [showSira, setShowSira] = useState(false); // état modal sira

  // 🔹 Contenu sira
  const siraprof = `من هو الدكتور فاضل السامرائي؟
========================
الدكتور فاضل صالح السامرائي هو واحد من علماء اللغة العربية المعاصرين الذين تبحَّروا في علوم اللغة، وقد اختار أن يكون همه الأكبر أن يضيفَ إلى ما قدَّمه السابقون من خدمة لكتاب الله سبحانه، وأن يستكشف ما فيه من أسرار بيانية، وقد قضى وقتًا طويلًا في البحث والتفكير في أسرار الإعجاز اللغوي في القرآن الكريم، ووفَّقه الله سبحانه إلى أن يُوصل ما رآه في القرآن الكريم من أسرار لغوية معجزة إلى أعداد كبيرة من المتخصصين ومن غير المتخصصين، سواء عبر مؤلفاته المتعددة، أو عبر برنامج "لمسات بيانية" الذي كان يذاع على قناة الشارقة الفضائية، وحاز قَبولَ أعدادٍ كبيرة من الناس، ولعل من أسباب ذلك القبول ـ إضافة إلى سعة علم الرجل ـ عمق رؤاه واعتماده على إقناع العقول بالأدلة والشواهد،...`; // ton texte complet ici

  // 🔹 Sécurité extraction vidéos
  const safeEntries = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.entries)) return data.entries;
    if (Array.isArray(data.videos)) return data.videos;
    return [];
  };

  const videos = safeEntries(data).filter((v) => v.id && v.title);

  // 🧠 Détection thème
  // ✅ Liste complète des السور
  const surahList = [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
    "الأنعام",
    "الأعراف",
    "الأنفال",
    "التوبة",
    "يونس",
    "هود",
    "يوسف",
    "الرعد",
    "إبراهيم",
    "الحجر",
    "النحل",
    "الإسراء",
    "الكهف",
    "مريم",
    "طه",
    "الأنبياء",
    "الحج",
    "المؤمنون",
    "النور",
    "الفرقان",
    "الشعراء",
    "النمل",
    "القصص",
    "العنكبوت",
    "الروم",
    "لقمان",
    "السجدة",
    "الأحزاب",
    "سبأ",
    "فاطر",
    "يس",
    "الصافات",
    "ص",
    "الزمر",
    "غافر",
    "فصلت",
    "الشورى",
    "الزخرف",
    "الدخان",
    "الجاثية",
    "الأحقاف",
    "محمد",
    "الفتح",
    "الحجرات",
    "ق",
    "الذاريات",
    "الطور",
    "النجم",
    "القمر",
    "الرحمن",
    "الواقعة",
    "الحديد",
    "المجادلة",
    "الحشر",
    "الممتحنة",
    "الصف",
    "الجمعة",
    "المنافقون",
    "التغابن",
    "الطلاق",
    "التحريم",
    "الملك",
    "القلم",
    "الحاقة",
    "المعارج",
    "نوح",
    "الجن",
    "المزمل",
    "المدثر",
    "القيامة",
    "الإنسان",
    "المرسلات",
    "النبأ",
    "النازعات",
    "عبس",
    "التكوير",
    "الإنفطار",
    "المطففين",
    "الإنشقاق",
    "البروج",
    "الطارق",
    "الأعلى",
    "الغاشية",
    "الفجر",
    "البلد",
    "الشمس",
    "الليل",
    "الضحى",
    "الشرح",
    "التين",
    "العلق",
    "القدر",
    "البينة",
    "الزلزلة",
    "العاديات",
    "القارعة",
    "التكاثر",
    "العصر",
    "الهمزة",
    "الفيل",
    "قريش",
    "الماعون",
    "الكوثر",
    "الكافرون",
    "النصر",
    "المسد",
    "الإخلاص",
    "الفلق",
    "الناس",
  ];

  // ✅ Règles thématiques réelles des titres
  const themeRules = [
    { theme: "لمسات بيانية", keywords: ["لمسات بيانية"] },
    { theme: "أسماء الله الحسنى", keywords: ["أسماء الله", "الحسنى"] },
    {
      theme: "إعجاز بياني",
      keywords: ["إعجاز", "بلاغة", "سر التعبير", "التعبير القرآني"],
    },
    {
      theme: "الفروق اللغوية",
      keywords: ["الفرق بين", "لماذا", "اختيار", "استعمال", "دلالة"],
    },
    { theme: "تفسير لفظة", keywords: ["معنى", "لفظة", "كلمة", "تعبير"] },
    {
      theme: "قصص الأنبياء",
      keywords: ["موسى", "إبراهيم", "يوسف", "نوح", "آدم", "عيسى"],
    },
    {
      theme: "مشاهد القيامة",
      keywords: ["القيامة", "الجنة", "النار", "الحساب", "العذاب"],
    },
  ];
  // 🧠 Détection thème intelligente
  const detectTheme = (title = "") => {
    // 🔹 Détection par sourate
    for (const surah of surahList) {
      if (title.includes(surah)) {
        return `سورة ${surah}`;
      }
    }

    // 🔹 Détection par mots-clés réels
    for (const rule of themeRules) {
      for (const key of rule.keywords) {
        if (title.includes(key)) {
          return rule.theme;
        }
      }
    }

    return "عام";
  };
  // 📂 Enrichissement
  const enrichedVideos = useMemo(
    () => videos.map((v) => ({ ...v, theme: detectTheme(v.title) })),
    [videos],
  );

  // 🔍 Recherche + filtre
  const filteredVideos = enrichedVideos.filter((v) => {
    const matchSearch = v.title.includes(search);
    const matchTheme = activeTheme === "all" || v.theme === activeTheme;
    return matchSearch && matchTheme;
  });

  const themes = ["all", ...new Set(enrichedVideos.map((v) => v.theme))];

  return (
    <div className={dark ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="p-4 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
          <h2
            className="text-xl font-bold"
            style={{
              fontFamily: "'Arabic Typesetting', serif",
              fontSize: "26px",
              padding: "0.75rem",
              color: "red",
              transition: "color 0.3s",
            }}
          >
            📚 ابداعات الدكتور فاضل السامرائي انقر عنوان للمشاهدة (
            {videos.length})
          </h2>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded border"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={() =>
                dispatch(
                  setSelectedGenre({
                    id: "dorar",
                    title: "إيضاح المعاني على رسالة القيراوني",
                    source: "bayan",
                  }),
                )
              }
              className="px-3 py-1 rounded-xl shadow-lg font-semibold transition-transform hover:scale-105 bg-gradient-to-r from-[#D4AF37] to-[#b78e2a] text-black"
            >
              ← Retour
            </button>

            <button
              onClick={() => setShowSira(true)}
              className="px-3 py-1 rounded-xl shadow-lg font-semibold transition-transform hover:scale-105 bg-gradient-to-r from-[#D4AF37] to-[#b78e2a] text-black"
            >
              سيرته
            </button>
          </div>
        </div>

        {showSira && (
          <FiqhDetailsModal
            data={{ title: "سيرة الدكتور فاضل السامرائي", details: siraprof }}
            onClose={() => setShowSira(false)}
          />
        )}

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
            color: "red",
            transition: "color 0.3s",
          }}
        />

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

        <ul className="space-y-2 list-decimal list-inside pl-4">
          {filteredVideos.map((video) => (
            <li key={video.id}>
              <span
                className="hover:underline text-blue-500 cursor-pointer"
                style={{
                  fontFamily: "'Arabic Typesetting', serif",
                  fontSize: "30px",
                  padding: "0.75rem",
                  transition: "color 0.3s",
                  textAlign: "right",
                }}
                onClick={() =>
                  dispatch(showMovie({ ...video, dataset: "dorar" }))
                }
              >
                {video.title}
              </span>
              <div className="text-xs opacity-70 mt-1 text-right">
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
