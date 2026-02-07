// utils/highlightTextAdvanced.js
import React from "react";

/**
 * Surligne toutes les occurrences du mot recherché (case-insensitive)
 * @param {string} text - Le texte complet
 * @param {string} search - Le mot recherché
 * @returns {React.Node[]} - Tableau React avec <mark> pour les correspondances
 */
export function highlightTextAdvanced(text, search) {
  if (!search) return text;

  // Échapper les caractères spéciaux pour Regex
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedSearch})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-300 text-black rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}
