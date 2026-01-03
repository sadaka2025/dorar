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
    (v) => v.id === movieId && v.dataset === dataset
  );

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [childModal, setChildModal] = useState(null);

  if (!enabled || !video) return null;

  const isExternalLink =
    typeof video.url === "string" &&
    (video.url.includes("youtu") || video.url.includes("drive.google"));

  const getEmbedUrl = (url) => {
    if (!url) return "";

    // YouTube watch → embed
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // YouTube short → embed
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // Google Drive
    if (url.includes("drive.google.com")) {
      return url.replace("/view", "/preview");
    }

    return url;
  };

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
          {/* HEADER */}
          <div className="flex justify-end p-3">
            <button
              onClick={() => dispatch(hide())}
              className="text-gray-300 hover:text-white text-xl"
            >
              ✖
            </button>
          </div>

          {/* CONTENU */}
          <div className="flex flex-col md:flex-row w-full">
            {/* MINIATURE */}
            <div className="w-full md:w-1/2 p-4">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="relative cursor-pointer rounded-lg overflow-hidden"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 hover:bg-black/70 transition flex justify-center items-center">
                  <AiOutlinePlayCircle size={90} className="text-white" />
                </div>
              </div>
            </div>

            {/* INFOS */}
            <div className="w-full md:w-1/2 p-5 space-y-4">
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
                <div className="text-sm font-arabic space-y-1">
                  <div className="text-cyan-300">📚 {video.semesterLabel}</div>
                  <div className="text-cyan-300">👤 {video.professor}</div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <AiFillStar className="text-yellow-500" />
                <span className="text-gray-400 text-sm">
                  {isExternalLink ? "Vidéo externe" : "Vidéo locale"}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-arabic">
                <strong>الوصف:</strong> {video.description}
              </p>

              {/* PDF */}
              <div className="flex flex-col gap-3 pt-4">
                {video.textPdf && (
                  <button
                    onClick={() => window.open(video.textPdf, "_blank")}
                    className="btn-primary"
                  >
                    النص المستخرج من اللقاء
                  </button>
                )}
                {video.fawaaidPdf && (
                  <button
                    onClick={() => window.open(video.fawaaidPdf, "_blank")}
                    className="btn-secondary"
                  >
                    فوائد و عبر
                  </button>
                )}
                {video.motounPdf && (
                  <button
                    onClick={() => window.open(video.motounPdf, "_blank")}
                    className="btn-secondary"
                  >
                    أبيات المتون
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MODAL VIDEO STYLE e.sia.watch */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backgroundImage: "url('/images/1.avif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl hover:scale-110 transition"
            >
              <AiOutlineClose />
            </button>

            <motion.div
              className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {isExternalLink ? (
                <iframe
                  src={getEmbedUrl(video.url)}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <video
                  autoPlay
                  controls
                  className="w-full h-full object-contain"
                >
                  {Array.isArray(video.url) ? (
                    video.url.map((src, i) => (
                      <source key={i} src={src} type="video/mp4" />
                    ))
                  ) : (
                    <source src={video.url} type="video/mp4" />
                  )}
                </video>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOUS MODAL */}
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
