import React from "react";
import { useDispatch } from "react-redux";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { motion } from "framer-motion";

export default function Movie({ data, dataset }) {
  const dispatch = useDispatch();

  if (!data) return null;

  return (
    <motion.div
      className="inline-block flex-shrink-0 drop-shadow-lg bg-neutral-900 h-[330px] w-44 rounded-lg cursor-pointer"
      onClick={() => dispatch(showMovie({ id: data.id, dataset }))}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        className="w-full rounded-t-lg object-cover h-44"
        src={
          data.thumbnail ||
          "https://images.unsplash.com/photo-1662675117392-561a414fcefc?auto=format&fit=crop&w=687&q=80"
        }
        alt={data.title ?? "Thumbnail not found"}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://images.unsplash.com/photo-1662675117392-561a414fcefc?auto=format&fit=crop&w=687&q=80";
        }}
      />
      <div className="p-2.5 space-y-1">
        <p
          className="text-neutral-500 text-xs line-clamp-3"
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            textAlign: "center",
            fontSize: "18px",
            padding: "0.75rem",
            color: "yellow", // couleur par défaut
            transition: "color 0.3s", // animation douce au survol
          }}
        >
          {data.description ?? ""} <br />
          {data.semesterLabel ?? ""}
          <br />
          {data.title ?? ""}
        </p>
        <button
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            textAlign: "center",
            fontSize: "18px",
            padding: "0.75rem",
            color: "yellow", // couleur par défaut
            transition: "color 0.3s", // animation douce au survol
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg shadow text-sm whitespace-nowrap"
        >
          عرض تفاصيل اللقاء
        </button>
      </div>
    </motion.div>
  );
}
