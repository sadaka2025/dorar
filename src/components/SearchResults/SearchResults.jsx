import React from "react";
import { motion } from "framer-motion";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";
import { allVideos } from "../MovieModal/allVideos";

export default function SearchResults({ search, onSelect }) {
  const filtered = React.useMemo(() => {
    if (!search.trim()) return [];
    return allVideos.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <motion.div
      className="absolute top-12 w-full z-50"
      transition={{ duration: 0.4 }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {filtered.length > 0 ? (
        <div className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px] max-h-96 overflow-y-auto">
          {filtered.map((movie) => (
            <SearchMovieTile
              key={movie.dataset + "_" + movie.id}
              movie={movie}
              onClick={() => onSelect(movie)}
            />
          ))}
        </div>
      ) : (
        <p className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px] text-neutral-100 p-2">
          Nothing found
        </p>
      )}
    </motion.div>
  );
}
