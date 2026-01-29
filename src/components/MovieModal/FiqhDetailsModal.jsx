import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export default function FiqhDetailsModal({ data, onClose }) {
  if (!data) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal glass"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: "6px solid gold" }}
      >
        <button className="modal-close-top" onClick={onClose}>
          ✖
        </button>

        <h2
          className="modal-content-arabic"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {data.title}
        </h2>

        <div
          className="modal-content-arabic"
          style={{
            whiteSpace: "pre-line",
            lineHeight: "2.2",
            background: "rgba(255,255,255,0.92)",
            padding: "20px",
            borderRadius: "16px",
            color: "#111",
          }}
        >
          {data.details}
        </div>
      </div>
    </div>,
    document.body,
  );
}
