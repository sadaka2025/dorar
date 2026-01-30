import React, { useEffect } from "react";

const DEFAULT_COLOR = "#c9741aff"; // ancienne couleur EffetcNewFix

export default function EffetcNewFix({
  text = "",
  className = "",
  size = "2.5rem",
  color, // optionnel
  glowColor = "#c9741aff",
  fontFamily = "'Amiri', 'Scheherazade', serif",
  as = "h2",
}) {
  useEffect(() => {
    const styleId = `dynamic-glow-${glowColor.replace("#", "")}`;

    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;

    style.textContent = `
      .glow-title {
        display: inline-block;
        font-weight: 700;
        white-space: nowrap;
        position: relative;
        text-align: center;
        direction: rtl;
        unicode-bidi: bidi-override;
        transition: all 0.3s ease-in-out;
      }

      .glow-title.glow {
        animation: glowText-${styleId} 2s ease-in-out infinite;
      }

      @keyframes glowText-${styleId} {
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

    return () => {
      if (style.parentNode) style.remove();
    };
  }, [glowColor]);

  if (!text) return null;

  const Component = as;

  return (
    <Component
      className={`glow-title glow ${className}`}
      style={{
        fontSize: size,
        color: color ?? DEFAULT_COLOR,
        fontFamily,
      }}
    >
      {text}
    </Component>
  );
}
