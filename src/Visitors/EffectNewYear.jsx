import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DEFAULT_COLOR = "#00ffe7"; // couleur par défaut glow

export default function EffectNewYear({
  text = "",
  className = "",
  size = "3rem",
  color, // optionnel, si non fourni prend DEFAULT_COLOR
  glowColor = "#00ffe7",
  fontFamily = "'Amiri', 'Scheherazade', serif",
  as = "h2", // possibilité de changer la balise
}) {
  const wordsRef = useRef([]);

  // ✅ Style glow dynamique
  useEffect(() => {
    const styleId = `glow-style-dynamic-${glowColor.replace("#", "")}`;
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
        font-family: ${fontFamily};
        transition: all 0.3s ease-in-out;
      }

      .glow-title.glow {
        animation: glowText-${styleId} 2s ease-in-out infinite;
      }

      @keyframes glowText-${styleId} {
        0%, 100% {
          text-shadow:
            0 0 10px ${glowColor},
            0 0 20px ${glowColor},
            0 0 30px ${glowColor};
        }
        50% {
          text-shadow:
            0 0 5px ${glowColor},
            0 0 15px ${glowColor},
            0 0 25px ${glowColor};
        }
      }
    `;
    document.head.appendChild(style);

    return () => style.remove();
  }, [glowColor, fontFamily]);

  // ✅ Animation GSAP
  useEffect(() => {
    const words = wordsRef.current.filter(Boolean);
    if (!words.length) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    tl.fromTo(
      words,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6, ease: "power1.out" },
    ).to(words, { opacity: 0, y: -50, stagger: 0.2, duration: 0.6, delay: 1 });

    return () => tl.kill();
  }, [text]);

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
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          ref={(el) => (wordsRef.current[i] = el)}
          className="inline-block mx-2"
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
