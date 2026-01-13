// src/effects/AnimatedGlowTitle.jsx
import React, { useEffect } from "react";

export default function EffetcNewFix({
  text = "",
  className = "",
  size = "2.5rem", // Taille du texte
  color = "#ffffff", // Couleur du texte
  glowColor = "#c9741aff", // Couleur du glow (lueur)
}) {
  useEffect(() => {
    // Supprime les anciens styles pour éviter les doublons
    const existingStyle = document.getElementById("dynamic-glow-style");
    if (existingStyle) existingStyle.remove();

    const style = document.createElement("style");
    style.id = "dynamic-glow-style";
    style.textContent = `
      .glow-title {
        display: inline-block;
        font-weight: 700;
        font-family: 'Amiri', 'Scheherazade', serif;
        white-space: nowrap;
        position: relative;
        text-align: center;
        direction: rtl;
        unicode-bidi: bidi-override;
        transition: all 0.3s ease-in-out;
      }

      .glow-title.glow {
        animation: glowText 2s ease-in-out infinite;
      }

      @keyframes glowText {
        0%, 100% {
          text-shadow:
            0 0 8px ${glowColor},
            0 0 16px ${glowColor},
            0 0 24px ${glowColor};
        }
        50% {
          text-shadow:
            0 0 4px ${glowColor},
            0 0 10px ${glowColor},
            0 0 16px ${glowColor};
        }
      }
    `;
    document.head.appendChild(style);

    // ✅ Nettoyage sécurisé
    return () => {
      try {
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      } catch (err) {
        console.warn("EffetcNewFix cleanup skipped:", err);
      }
    };
  }, [glowColor]);

  if (!text) return null;

  return (
    <h2
      className={`glow-title glow ${className}`}
      style={{
        fontSize: size,
        color: color,
      }}
    >
      {text}
    </h2>
  );
}
