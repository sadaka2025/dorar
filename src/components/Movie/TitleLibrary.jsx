import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { setSelectedGenre } from "../../redux/reducers/selectedGenresSlice";
import FiqhDetailsModal from "../MovieModal/FiqhDetailsModal";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function TitleLibrary() {
  const dispatch = useDispatch();

  /* ===================== STATE ===================== */
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [activeTheme, setActiveTheme] = useState("all");
  const [showSira, setShowSira] = useState(false);

  /* ===================== LOAD DATA ===================== */
  useEffect(() => {
    fetch("/data/dataDrV_with_subtitles.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error);
  }, []);

  /* ===================== DEBOUNCE SEARCH ===================== */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  // 🔹 Contenu sira
  const siraprof = `من هو الدكتور فاضل السامرائي؟
========================
الدكتور فاضل صالح السامرائي هو واحد من علماء اللغة العربية المعاصرين الذين تبحَّروا في علوم اللغة، وقد اختار أن يكون همه الأكبر أن يضيفَ إلى ما قدَّمه السابقون من خدمة لكتاب الله سبحانه، وأن يستكشف ما فيه من أسرار بيانية، وقد قضى وقتًا طويلًا في البحث والتفكير في أسرار الإعجاز اللغوي في القرآن الكريم، ووفَّقه الله سبحانه إلى أن يُوصل ما رآه في القرآن الكريم من أسرار لغوية معجزة إلى أعداد كبيرة من المتخصصين ومن غير المتخصصين، سواء عبر مؤلفاته المتعددة، أو عبر برنامج "لمسات بيانية" الذي كان يذاع على قناة الشارقة الفضائية، وحاز قَبولَ أعدادٍ كبيرة من الناس، ولعل من أسباب ذلك القبول ـ إضافة إلى سعة علم الرجل ـ عمق رؤاه واعتماده على إقناع العقول بالأدلة والشواهد،...`; // ton texte complet ici

  /* ===================== SAFE ENTRIES ===================== */
  const safeEntries = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.entries)) return data.entries;
    if (Array.isArray(data.videos)) return data.videos;
    return [];
  };

  const videos = safeEntries(data).filter((v) => v?.id && v?.title);

  /* ===================== NORMALIZE ===================== */
  const STOP_WORDS = [
    "في",
    "من",
    "على",
    "الى",
    "إلى",
    "عن",
    "ما",
    "ماذا",
    "لماذا",
    "قال",
    "يقول",
    "يعني",
    "اه",
    "نعم",
    "لا",
    "هو",
    "هي",
    "هذا",
    "هذه",
    "ذلك",
    "تلك",
    "كان",
    "كانت",
    "يكون",
    "تكون",
  ];
  const normalize = (s = "") =>
    s
      .toLowerCase()
      .replace(/[إأآا]/g, "ا")
      .replace(/[ىي]/g, "ي")
      .replace(/[ة]/g, "ه")
      .replace(/[ؤ]/g, "و")
      .replace(/[ئ]/g, "ي")
      .replace(/[^ء-يa-z0-9\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

  const semanticMatch = (line, query) => {
    const qWords = normalize(query)
      .split(" ")
      .filter((w) => w.length > 2 && !STOP_WORDS.includes(w));

    const lineNorm = normalize(line);

    if (qWords.length === 0) return false;

    return qWords.every((word) => lineNorm.includes(word));
  };

  /* ===================== THEMES ===================== */
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

  const themeRules = [
    { theme: "لمسات بيانية", keywords: ["لمسات بيانية"] },
    { theme: "أسماء الله الحسنى", keywords: ["أسماء الله", "الحسنى"] },
    { theme: "إعجاز بياني", keywords: ["إعجاز", "بلاغة", "سر التعبير"] },
    { theme: "الفروق اللغوية", keywords: ["الفرق بين", "لماذا", "اختيار"] },
    { theme: "تفسير لفظة", keywords: ["معنى", "لفظة", "كلمة"] },
    {
      theme: "قصص الأنبياء",
      keywords: ["موسى", "إبراهيم", "يوسف", "نوح", "آدم", "عيسى"],
    },
    {
      theme: "مشاهد القيامة",
      keywords: ["القيامة", "الجنة", "النار", "الحساب"],
    },
  ];

  const detectTheme = (title = "") => {
    for (const surah of surahList)
      if (title.includes(surah)) return `سورة ${surah}`;
    for (const rule of themeRules)
      for (const key of rule.keywords)
        if (title.includes(key)) return rule.theme;
    return "عام";
  };

  /* ===================== INDEXING ===================== */
  const enrichedVideos = useMemo(() => {
    return videos.map((v) => {
      const normTitle = normalize(v.title || "");
      const normSubtitle = normalize(v.subtitle || "");
      const subtitleLines = (v.subtitle || "")
        .split(/[\n.?!]+/)
        .filter((l) => l.trim() !== "");
      const isShort =
        /فيديو\s*قصير/i.test(v.title || "") ||
        /\bshort\b/i.test(v.title || "") ||
        /youtube\.com\/shorts\//i.test(v.url || "");
      return {
        ...v,
        theme: detectTheme(v.title),
        _normTitle: normTitle,
        _normSubtitle: normSubtitle,
        _isShort: isShort,
        subtitleLines,
      };
    });
  }, [videos]);

  /* ===================== SEARCH ===================== */
  const filteredVideos = useMemo(() => {
    const q = normalize(debouncedSearch).trim();
    const qWords = q.split(" ").filter((w) => w.length > 1);

    return enrichedVideos.filter((v) => {
      if (v._isShort) return false;
      if (activeTheme !== "all" && v.theme !== activeTheme) return false;
      if (!qWords.length) return true;
      const titleMatch = qWords.every((word) => v._normTitle.includes(word));
      const subtitleMatch = v.subtitleLines?.some((line) =>
        qWords.every((word) => normalize(line).includes(word)),
      );
      return titleMatch || subtitleMatch;
    });
  }, [debouncedSearch, activeTheme, enrichedVideos]);

  const themes = ["all", ...new Set(enrichedVideos.map((v) => v.theme))];

  /* ===================== HIGHLIGHT ===================== */
  const highlightText = (originalText = "", query = "") => {
    if (!query || !originalText) return originalText;
    const q = normalize(query);
    const normText = normalize(originalText);
    if (!normText.includes(q)) return originalText;
    const result = [];
    let lastIndex = 0;
    const regex = new RegExp(q, "gi");
    let match;
    while ((match = regex.exec(normText)) !== null) {
      const start = match.index;
      const end = start + q.length;
      result.push(originalText.slice(lastIndex, start));
      result.push(
        <span
          key={start + "-" + end}
          style={{
            backgroundColor: "#ffe066",
            color: "#000",
            padding: "0 4px",
            borderRadius: "5px",
            fontWeight: "bold",
            boxShadow: "0 0 6px rgba(255, 224, 102, 0.6)",
          }}
        >
          {originalText.slice(start, end)}
        </span>,
      );
      lastIndex = end;
    }
    result.push(originalText.slice(lastIndex));
    return result;
  };

  /* ===================== DOWNLOAD FUNCTIONS ===================== */
  const handleDownloadJSON = () => {
    if (!filteredVideos.length) return alert("لا توجد نتائج للتحميل");
    const jsonStr = JSON.stringify(filteredVideos, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "search-results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadDOCX = () => {
    if (!filteredVideos.length) return alert("لا توجد نتائج للتحميل");

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: filteredVideos
            .map((v, idx) => {
              const filteredLines =
                v.subtitleLines?.filter((line) =>
                  normalize(line).includes(normalize(debouncedSearch)),
                ) || [];

              const children = [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${idx + 1}. ${v.title}`,
                      bold: true,
                      size: 28,
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `URL: ${v.url}`,
                      italics: true,
                      break: 1,
                    }),
                    new TextRun({ text: `Theme: ${v.theme}`, break: 1 }),
                  ],
                }),
              ];

              // Ajouter les sous-titres filtrés
              filteredLines.forEach((line) => {
                children.push(
                  new Paragraph({
                    children: [new TextRun({ text: `- ${line}`, break: 1 })],
                  }),
                );
              });

              // espace entre vidéos
              children.push(
                new Paragraph({ children: [new TextRun({ text: "\n" })] }),
              );

              return children;
            })
            .flat(),
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => saveAs(blob, "search-results.docx"));
  };

  /* ===================== RETURN JSX ===================== */
  return (
    <div className={dark ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="p-4 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
          <h2
            className="text-xl font-bold"
            style={{
              fontFamily: "'Arabic Typesetting', serif",
              fontSize: "26px",
              color: "red",
            }}
          >
            📚 ابداعات الدكتور فاضل السامرائي ({videos.length})
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
              className="px-3 py-1 rounded-xl shadow-lg font-semibold bg-gradient-to-r from-[#D4AF37] to-[#b78e2a] text-black"
            >
              ← Retour
            </button>
            <button
              onClick={() => setShowSira(true)}
              className="px-3 py-1 rounded-xl shadow-lg font-semibold bg-gradient-to-r from-[#D4AF37] to-[#b78e2a] text-black"
            >
              سيرته
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-3 py-1 rounded-xl shadow-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 text-white"
            >
              ⬇️ تحميل نتائج البحث
            </button>
            <button
              onClick={handleDownloadDOCX}
              className="px-3 py-1 rounded-xl shadow-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-700 text-white"
            >
              📄 تحويل إلى DOCX
            </button>
          </div>
        </div>

        {showSira && (
          <FiqhDetailsModal
            data={{ title: "سيرة الدكتور فاضل السامرائي", details: siraprof }}
            onClose={() => setShowSira(false)}
          />
        )}

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="🔍 بحث ذكي في العناوين + التفريغ النصي"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded border text-black"
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            fontSize: "26px",
            color: "red",
          }}
        />

        {/* THEMES */}
        <div className="flex flex-wrap gap-2 mb-4">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`px-3 py-1 rounded text-sm border ${activeTheme === theme ? "bg-blue-600 text-white" : "bg-transparent"}`}
            >
              {theme === "all" ? "الكل" : theme}
            </button>
          ))}
        </div>

        {/* VIDEOS LIST */}
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
                {highlightText(video.title, debouncedSearch)}
              </span>
              {video.subtitleLines && debouncedSearch && (
                <div
                  className="mt-2 text-sm opacity-80"
                  style={{
                    fontFamily: "'Arabic Typesetting', serif",
                    fontSize: "22px",
                    textAlign: "right",
                    lineHeight: "1.6",
                    color: dark ? "#e5e5e5" : "#333",
                  }}
                >
                  {video.subtitleLines
                    .filter((line) =>
                      normalize(line).includes(normalize(debouncedSearch)),
                    )
                    .map((line, idx) => (
                      <div key={idx}>
                        {highlightText(line, debouncedSearch)}
                      </div>
                    ))}
                </div>
              )}
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
