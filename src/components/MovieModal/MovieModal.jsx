import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hide, selectMovieModal } from "../../redux/reducers/movieModalSlice";
import {
  AiOutlinePlayCircle,
  AiFillStar,
  AiOutlineClose,
} from "react-icons/ai";
import { allVideos } from "./allVideos";
import VideoInfoModal from "./VideoInfoModal";
import "./VideoInfoModal.css";

export default function MovieModal() {
  const dispatch = useDispatch();
  const { movieId, dataset, enabled } = useSelector(selectMovieModal);

  const video = allVideos.find(
    (v) => v.id === movieId && v.dataset === dataset,
  );

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [childModal, setChildModal] = useState(null);

  if (!enabled || !video) return null;

  const isExternalLink =
    typeof video.url === "string" &&
    (video.url.includes("youtu") || video.url.includes("drive.google"));

  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }

    if (url.includes("drive.google.com")) {
      return url.replace("/view", "/preview");
    }

    return url;
  };

  return (
    <>
      {/* ================= MODAL PRINCIPAL ================= */}
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
          {/* HEADER */}
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
                onClick={() => setIsVideoOpen(true)}
                className="relative cursor-pointer rounded-lg overflow-hidden"
              >
                <img
                  src={video.thumbnail}
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
                style={{ fontFamily: "'Arabic Typesetting'", fontSize: "40px" }}
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
                {isExternalLink ? "Vidéo externe" : "Vidéo locale"}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-arabic">
                <strong>الوصف:</strong> {video.description}
              </p>

              <div className="flex flex-col gap-3 pt-4">
                {video.textPdf && (
                  <button
                    onClick={() => window.open(video.textPdf, "_blank")}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-bold"
                  >
                    النص المستخرج من اللقاء
                  </button>
                )}
                {video.fawaaidPdf && (
                  <button
                    onClick={() => window.open(video.fawaaidPdf, "_blank")}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-bold"
                  >
                    فوائد و عبر
                  </button>
                )}
                {video.motounPdf && (
                  <button
                    onClick={() => window.open(video.motounPdf, "_blank")}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-bold"
                  >
                    أبيات المتون
                  </button>
                )}
                {video.resumesemester && (
                  <button
                    onClick={() => window.open(video.resumesemester, "_blank")}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-bold"
                  >
                    نموذج 1 ملخص السداسي الاول
                  </button>
                )}
                {video.resumesemester1 && (
                  <button
                    onClick={() => window.open(video.resumesemester1, "_blank")}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-bold"
                  >
                    نموذج 2 ملخص السداسي الاول
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ================= MODAL VIDEO AVEC CADRE ================= */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ================= FOND ================= */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: 'url("/images/1.avif")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* ================= VIDEO ================= */}
            {isExternalLink ? (
              <iframe
                src={getEmbedUrl(video.url)}
                className="absolute inset-0 w-full h-full z-10"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                autoPlay
                controls
                className="absolute inset-0 w-full h-full object-contain z-10"
              >
                <source src={video.url} type="video/mp4" />
              </video>
            )}

            {/* ========== OVERLAY (OPTIONNEL) ========== */}
            {/* 👉 Assombrit SANS rendre la vidéo fade */}
            <div className="absolute inset-0 z-15 bg-black/20 pointer-events-none" />

            {/* ================= CADRE PNG ================= */}
            <img
              src="/images/tester.png"
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              alt="frame"
            />

            {/* ================= CLOSE ================= */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-30 text-white text-4xl"
            >
              <AiOutlineClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SOUS MODAL ================= */}
      {childModal && (
        <VideoInfoModal
          open={!!childModal}
          onClose={() => setChildModal(null)}
          title={childModal.title}
          content={childModal.content}
        />
      )}
    </>
  );
}
