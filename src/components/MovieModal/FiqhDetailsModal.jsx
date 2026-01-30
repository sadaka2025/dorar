import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import EffetcNewFix from "../../Visitors/EffetcNewFix";

export default function FiqhDetailsModal({ data, onClose }) {
  const [showFullText, setShowFullText] = useState(false);

  if (!data) return null;

  // Découpe le texte si on veut "اقرأ أقل"
  const previewText =
    data.details.length > 600
      ? data.details.slice(0, 600) + "..."
      : data.details;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal glass"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: "6px solid gold", maxWidth: "800px", width: "90%" }}
      >
        <button className="modal-close-top" onClick={onClose}>
          ✖
        </button>

        {/* Titre centré */}
        <div className="text-center mb-4">
          <span className="text-4xl">👇</span>

          <EffetcNewFix
            text={`🌿 ${data.title}`}
            as="h2"
            size="4rem"
            fontFamily="'Arabic Typesetting', serif"
            className="mb-4"
          />

          <span className="text-4xl">👇</span>
        </div>

        {/* Contenu avec scroll si texte long */}
        <div
          className="modal-content-arabic"
          style={{
            whiteSpace: "pre-line",
            lineHeight: "2.2",
            background: "linear-gradient(180deg, #fff7d6, #f8b500)",
            padding: "20px",
            borderRadius: "16px",
            color: "#111",
            maxHeight: "60vh", // limite la hauteur
            overflowY: "auto", // ajoute scroll vertical
          }}
        >
          {showFullText ? data.details : previewText}

          {/* Bouton Lire plus / moins */}
          {data.details.length > 600 && (
            <div
              className="text-center mt-4 cursor-pointer font-bold"
              onClick={() => setShowFullText(!showFullText)}
              style={{ color: "red" }}
            >
              {showFullText ? "اقرأ أقل" : "اقرأ المزيد"}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
