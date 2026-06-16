import { useDispatch } from "react-redux";
import { setSelectedGenre } from "../../redux/reducers/selectedGenresSlice";
import nourData from "../../data/nour-alyakine.json";
import fiqhData from "../../data/fiqh.json";
import dorarData from "../../data/dorarData.json";
import bjomaaData from "../../data/bjomaaData.json";
import React, { useState } from "react";
import FiqhDetailsModal from "../MovieModal/FiqhDetailsModal.jsx";
import Scene from "../../Visitors/Scene";
import motounData from "../../data/motoun.json";

export default function SideBar() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(null);

  const categories = [
    {
      id: "meeting",
      title: "فوائد و عبر من اللقاءات المباشرة",
    },
  ];

  const handleClick = (cat) => {
    dispatch(
      setSelectedGenre({
        id: cat.id,
        title: cat.title,
      }),
    );
  };

  return (
    <div
      className="bg-neutral-800 text-neutral-100 p-2 pr-0 drop-shadow-lg"
      style={{
        backgroundImage:
          'url("https://st2.depositphotos.com/8843414/12482/v/450/depositphotos_124824108-stock-illustration-abstract-hexagon-molecular-structure-pattern.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {categories.map((cat) => (
        <div key={cat.id} className="text-center mb-3">
          <div
            className="flex items-center justify-center gap-3"
            style={{ direction: "rtl" }}
          >
            <div
              onClick={() => handleClick(cat)}
              className="cursor-pointer hover:bg-cyan-600 font-bold px-2"
              style={{
                fontFamily: "'Arabic Typesetting', serif",
                fontSize: "38px",
                color: "yellow",
                whiteSpace: "nowrap",
              }}
            >
              {cat.title}
            </div>

            {cat.details && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(cat);
                }}
                className="cursor-pointer"
              >
                <Scene
                  text="اضغط للمزيد"
                  as="span"
                  style={{
                    fontSize: "28px",
                    fontFamily: "'Arabic Typesetting', serif",
                    glowColor: "#00ffe7",
                  }}
                  className="underline"
                />
              </span>
            )}
          </div>
        </div>
      ))}

      {openModal && (
        <FiqhDetailsModal data={openModal} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}
