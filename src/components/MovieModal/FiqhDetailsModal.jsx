import React, { useState } from "react";
import ReactDOM from "react-dom";
import EffetcNewFix from "../../Visitors/EffetcNewFix";
import "./Modal.css";

export default function FiqhDetailsModal({ data, onClose }) {
  const [showFullText, setShowFullText] = useState(false);
  if (!data) return null;

  const renderDetails = (content) => {
    if (content == null) return null;

    if (typeof content === "string") {
      const preview =
        content.length > 600 ? content.slice(0, 600) + "..." : content;
      return (
        <>
          {showFullText ? content : preview}
          {content.length > 600 && (
            <div
              className="text-center mt-2 cursor-pointer font-bold"
              onClick={() => setShowFullText(!showFullText)}
              style={{ color: "red" }}
            >
              {showFullText ? "اقرأ أقل" : "اقرأ المزيد"}
            </div>
          )}
        </>
      );
    }

    if (Array.isArray(content)) {
      return content.map((item, i) => (
        <div key={i} style={{ marginBottom: "0.8rem" }}>
          {renderDetails(item)}
        </div>
      ));
    }

    if (typeof content === "object") {
      return (
        <div>
          {Object.entries(content).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "0.8rem" }}>
              <strong>{key}:</strong>{" "}
              {typeof value === "object" ? renderDetails(value) : value}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

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

        {/* Title */}
        <div className="text-center mb-4">
          <span className="text-4xl">👇</span>
          <EffetcNewFix
            text={`🌿 ${data.title || ""}`}
            as="h2"
            size="4rem"
            fontFamily="'Arabic Typesetting', serif"
            className="mb-4"
          />
          <span className="text-4xl">👇</span>
        </div>

        {/* Content */}
        <div
          className="modal-content-arabic"
          style={{
            whiteSpace: "pre-line",
            lineHeight: "2.2",
            background: "linear-gradient(180deg, #fff7d6, #f8b500)",
            padding: "20px",
            borderRadius: "16px",
            color: "#111",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {renderDetails(data.details || data)}
        </div>
      </div>
    </div>,
    document.body,
  );
}
