import React from "react";
import { useDispatch } from "react-redux";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { motion } from "framer-motion";

export default function Movie({ video }) {
  const dispatch = useDispatch();

  if (!video) return null;

  // 🔐 Description safe handling
  const description = video.description ?? {};

  const highlight =
    typeof description === "object" && description !== null
      ? (description.highlight ?? "")
      : "";

  const text =
    typeof description === "object" && description !== null
      ? (description.text ?? "")
      : typeof description === "string"
        ? description
        : "";

  // 🖼️ Thumbnail fallback (important for yt-dlp)
  const thumbnail =
    video.thumbnail ||
    (video.id
      ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
      : "https://images.unsplash.com/photo-1662675117392-561a414fcefc?auto=format&fit=crop&w=687&q=80");

  return (
    <motion.div
      className="inline-block flex-shrink-0 drop-shadow-lg bg-neutral-900 h-[330px] w-64 rounded-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() =>
        dispatch(showMovie({ id: video.id, dataset: video.dataset }))
      }
    >
      {/* IMAGE / MINIATURE */}
      <img
        className="w-full rounded-t-lg object-cover h-44"
        src={thumbnail}
        alt={video.title || "Thumbnail"}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://images.unsplash.com/photo-1662675117392-561a414fcefc?auto=format&fit=crop&w=687&q=80";
        }}
      />

      {/* INFOS */}
      <div className="p-2.5 space-y-1">
        <p
          className="text-xs line-clamp-3 font-bold"
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            textAlign: "center",
            fontSize: "24px",
            padding: "1rem",
            color: "yellow",
            lineHeight: "0.7",
          }}
        >
          {highlight && (
            <span className="text-green-600 font-semibold">{highlight} </span>
          )}
          {text}
          <br />
          {video.semesterLabel ?? ""}
          <br />
          {video.title ?? ""}
        </p>

        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg shadow text-sm w-full"
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            fontSize: "18px",
            padding: "0.75rem",
            color: "yellow",
          }}
          onClick={(e) => {
            e.stopPropagation(); // ✅ éviter double click (card + button)
            dispatch(showMovie({ id: video.id, dataset: video.dataset }));
          }}
        >
          عرض تفاصيل اللقاء
        </button>
      </div>
    </motion.div>
  );
}
