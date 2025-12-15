import React from "react";
import { useDispatch } from "react-redux";
import { setGenre } from "../../redux/reducers/selectedGenresSlice";
import motounData from "../../data/motoun.json";
import nourData from "../../data/nour-alyakine.json";
import meetData from "../../data/meetData.json";
import dorarData from "../../data/dorarData.json";
import bjomaaData from "../../data/bjomaaData.json";

export default function SideBar({ onSelectGenre }) {
  const dispatch = useDispatch();

  const categories = [
    { id: "motoun", title: "المتون الشرعية", videos: motounData },

    {
      id: "meeting",
      title: " فوائد و عبر من اللقاءات المباشرة ",
      videos: meetData,
    },
    { id: "dorar", title: " درر مشايخنا ", videos: dorarData },
    {
      id: "nour",
      title: "سلسلة في السيرة مع الدكتور منير كمنتري ",
      videos: nourData,
    },
    {
      id: "bjomaa",
      title: "سلسلة في العقيدة النورية مع الاستاذ محمد بن جمعة ",
      videos: bjomaaData,
    },
  ];

  return (
    <div
      className="bg-neutral-800 text-neutral-100 p-2 pr-0 h-auto drop-shadow-lg"
      style={{
        backgroundImage:
          'url("https://st2.depositphotos.com/8843414/12482/v/450/depositphotos_124824108-stock-illustration-abstract-hexagon-molecular-structure-pattern.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => dispatch(setGenre(cat))}
          className="cursor-pointer hover:bg-cyan-600"
          style={{
            fontFamily: "'Arabic Typesetting', serif",
            fontSize: "40px",
            padding: "0.75rem",
            color: "yellow", // couleur par défaut
            transition: "color 0.3s", // animation douce au survol
          }}
        >
          {cat.title}
        </div>
      ))}
    </div>
  );
}
