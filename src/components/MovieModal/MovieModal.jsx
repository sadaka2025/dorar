import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { hide, selectMovieModal } from "../../redux/reducers/movieModalSlice";
import { AiOutlinePlayCircle, AiFillStar } from "react-icons/ai";
import { allVideos } from "./allVideos";
import VideoInfoModal from "./VideoInfoModal";
import "./VideoInfoModal.css";

export default function MovieModal() {
  const dispatch = useDispatch();
  const { movieId, dataset, enabled } = useSelector(selectMovieModal);

  const video = allVideos.find(
    (v) => v.id === movieId && v.dataset === dataset
  );

  const [childModal, setChildModal] = useState(null);

  if (!enabled || !video) return null;

  const isExternalLink =
    typeof video.url === "string" &&
    (video.url.includes("youtu") || video.url.includes("drive.google"));

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-neutral-900 rounded-xl shadow-xl text-white w-full max-w-[900px] flex flex-col md:flex-row"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          {/* Bouton fermer */}
          <div className="flex justify-end p-3">
            <button
              onClick={() => dispatch(hide())}
              className="text-gray-300 hover:text-white text-xl"
            >
              ✖
            </button>
          </div>

          {/* Contenu vidéo + PDF + infos */}
          <div className="flex flex-col md:flex-row w-full">
            {/* Vidéo */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center p-4">
              {isExternalLink ? (
                <div
                  className="cursor-pointer relative w-full"
                  onClick={() => window.open(video.url, "_blank")}
                >
                  <img
                    src={video.thumbnail}
                    className="rounded-lg h-full w-full object-cover"
                    alt={video.title}
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition flex justify-center items-center">
                    <AiOutlinePlayCircle size={80} className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="relative w-full flex justify-center items-center bg-black rounded-xl shadow-lg">
                  <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
                    <video
                      controls
                      autoPlay
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                    >
                      {Array.isArray(video.url) ? (
                        video.url.map((src, i) => (
                          <source key={i} src={src} type="video/mp4" />
                        ))
                      ) : (
                        <source src={video.url} type="video/mp4" />
                      )}
                    </video>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg border-8 border-gray-800"></div>
                </div>
              )}
            </div>

            {/* Infos vidéo */}
            <div className="w-full md:w-1/2 p-5 space-y-4">
              <h1
                className="text-3xl font-bold text-yellow-400 font-arabic"
                style={{
                  fontFamily: "'Arabic Typesetting', serif",
                  fontSize: "40px",
                  padding: "0.75rem",
                  color: "yellow", // couleur par défaut
                  transition: "color 0.3s", // animation douce au survol
                }}
              >
                {video.title}
              </h1>
              {video.semesterLabel && (
                <div className="text-sm text-cyan-300 font-arabic px-3">
                  📘 {video.semesterLabel}
                </div>
              )}

              <div className="flex items-center gap-2">
                <AiFillStar size={18} className="text-yellow-500" />
                <span className="text-gray-400 text-sm">
                  {isExternalLink
                    ? "Vidéo externe (YouTube / Google Drive)"
                    : "Matériel audio/vidéo local"}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed line-clamp-6 font-arabic">
                <strong>Description: </strong>
                {video.description}
              </p>

              {/* Boutons PDF spécifiques */}
              <div className="flex flex-col gap-3 mt-4">
                {video.textPdf && (
                  <button
                    onClick={() => window.open(video.textPdf, "_blank")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold font-arabic"
                  >
                    النص المستخرج من اللقاء
                  </button>
                )}
                {video.fawaaidPdf && (
                  <button
                    onClick={() => window.open(video.fawaaidPdf, "_blank")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold font-arabic"
                  >
                    فوائد و عبر و وقفات ايمانية من اللقاء
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Sous-modal */}
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
