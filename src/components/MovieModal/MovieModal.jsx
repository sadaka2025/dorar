import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hide, selectMovieModal } from "../../redux/reducers/movieModalSlice";
import FiqhDetailsModal from "./FiqhDetailsModal";
import VideoInfoModal from "./VideoInfoModal";
import {
  AiOutlinePlayCircle,
  AiFillStar,
  AiOutlineClose,
} from "react-icons/ai";
import { allVideos } from "./allVideos";
import "./VideoInfoModal.css";

export default function MovieModal() {
  const dispatch = useDispatch();
  const { movieId, dataset, enabled } = useSelector(selectMovieModal);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [childModal, setChildModal] = useState(null);

  const video = allVideos.find(
    (v) => v.id === movieId && v.dataset === dataset,
  );
  if (!enabled || !video) return null;

  const isEmbedVideo =
    typeof video.url === "string" &&
    (video.url.includes("youtu") || video.url.includes("drive.google"));
  const isLocalVideo =
    typeof video.url === "string" && video.url.endsWith(".mp4");
  const isWebSite =
    typeof video.url === "string" &&
    video.url.startsWith("http") &&
    !isEmbedVideo &&
    !isLocalVideo;

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch"))
      return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}?autoplay=1&rel=0`;
    if (url.includes("youtu.be/"))
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}?autoplay=1&rel=0`;
    if (url.includes("drive.google.com"))
      return url.replace("/view", "/preview");
    return url;
  };

  const renderDescription = (description) => {
    if (!description) return null;
    if (typeof description === "string") return description;
    if (typeof description === "object")
      return (
        <>
          <span className="text-green-600 font-semibold">
            {description.highlight}
          </span>{" "}
          {description.text}
        </>
      );
    return null;
  };

  const pdfButtons = [
    {
      key: "textPdf",
      label: "النص المستخرج من اللقاء",
      css: "bg-blue-600 hover:bg-blue-700",
    },
    {
      key: "textPdf1",
      label: "الجزء الاول من الكتاب",
      css: "bg-blue-600 hover:bg-blue-700",
    },
    {
      key: "textPdf2",
      label: "الجزء الثاني من الكتاب",
      css: "bg-blue-600 hover:bg-blue-700",
    },
    {
      key: "fawaaidPdf",
      label: "فوائد و عبر",
      css: "bg-purple-600 hover:bg-purple-700",
    },
    {
      key: "motounPdf",
      label: "أبيات المتون",
      css: "bg-purple-600 hover:bg-purple-700",
    },
    {
      key: "resumesemester",
      label: "نموذج 1 ملخص السداسي الاول",
      css: "bg-purple-600 hover:bg-purple-700",
    },
    {
      key: "resumesemester1",
      label: "نموذج 2 ملخص السداسي الاول",
      css: "bg-purple-600 hover:bg-purple-700",
    },
    {
      key: "resumesemester2",
      label: "نموذج 3 ملخص السداسي الاول",
      css: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const modalButtons = [
    {
      key: "siraprof",
      label: "👤 سيرة مقدم هذه السلسلة",
      css: "bg-amber-600 hover:bg-amber-700",
    },
    {
      key: "sirabook",
      label: "مميزات الكتاب",
      css: "bg-amber-600 hover:bg-amber-700",
    },
    {
      key: "subtitle",
      label: "محتوى اللقاء",
      css: "bg-amber-600 hover:bg-amber-700",
    },
    {
      key: "analysis",
      label: "فائدة علمية من اللقاء",
      css: "bg-amber-600 hover:bg-amber-700",
    },
  ];

  return (
    <>
      {/* MODAL PRINCIPAL */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/80 flex justify-center items-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-neutral-900 rounded-xl shadow-xl text-white w-full max-w-[900px]"
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
        >
          <div className="flex justify-end p-3">
            <button
              onClick={() => dispatch(hide())}
              className="text-gray-300 hover:text-white text-xl"
            >
              ✖
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* MINIATURE */}
            <div className="md:w-1/2 p-4">
              <div
                onClick={() =>
                  isWebSite
                    ? window.open(video.url, "_blank")
                    : setIsVideoOpen(true)
                }
                className="relative cursor-pointer rounded-lg overflow-hidden"
              >
                <img
                  src={video.thumbnail || "/images/default-thumbnail.png"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 hover:bg-black/70 flex justify-center items-center">
                  <AiOutlinePlayCircle size={90} />
                </div>
              </div>
            </div>

            {/* INFOS */}
            <div className="md:w-1/2 p-5 space-y-4">
              <h1
                className="font-arabic text-yellow-400"
                style={{
                  fontFamily: "'Arabic Typesetting', serif",
                  fontSize: "40px",
                }}
              >
                {video.title}
              </h1>

              {video.semesterLabel && (
                <div className="text-sm font-arabic space-y-1 text-cyan-300">
                  <div>📚 {video.semesterLabel}</div>
                  <div>👤 {video.professor}</div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <AiFillStar className="text-yellow-500" />
                {isWebSite
                  ? "🌐 Site externe"
                  : isEmbedVideo
                    ? "🎬 Vidéo externe"
                    : "🎥 Vidéo locale"}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-arabic">
                <strong>الوصف:</strong> {renderDescription(video.description)}
              </p>

              <div className="flex flex-col gap-3 pt-4">
                {pdfButtons.map((btn) =>
                  video[btn.key] ? (
                    <button
                      key={btn.key}
                      onClick={() => window.open(video[btn.key], "_blank")}
                      className={`px-4 py-2 ${btn.css} rounded-lg font-bold`}
                    >
                      {btn.label}
                    </button>
                  ) : null,
                )}

                {modalButtons.map((btn) =>
                  video[btn.key] ? (
                    <button
                      key={btn.key}
                      onClick={() =>
                        setChildModal({
                          title: btn.label,
                          details: video[btn.key],
                        })
                      }
                      className={`px-4 py-2 ${btn.css} rounded-lg font-bold`}
                    >
                      {btn.label}
                    </button>
                  ) : null,
                )}

                {video.matns?.map((matn) => (
                  <a
                    key={matn.key}
                    href={matn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-yellow-400 font-bold hover:text-yellow-500 underline mb-1"
                  >
                    ▶️ {matn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && !isWebSite && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* VIDEO / IFRAME plein écran */}
            {isEmbedVideo ? (
              <iframe
                src={getEmbedUrl(video.url)}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <video autoPlay controls className="w-full h-full object-contain">
                <source src={video.url} type="video/mp4" />
              </video>
            )}

            {/* Cadre PNG */}
            <img
              src="/images/tester.png"
              className="absolute inset-0 w-full h-full pointer-events-none"
              alt="frame"
            />

            {/* Bouton CLOSE */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white text-4xl"
            >
              <AiOutlineClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIQH MODAL */}
      {childModal && (
        <FiqhDetailsModal
          data={childModal}
          onClose={() => setChildModal(null)}
        />
      )}
    </>
  );
}
