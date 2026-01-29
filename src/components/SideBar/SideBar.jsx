import { useDispatch } from "react-redux";
import { setGenre } from "../../redux/reducers/selectedGenresSlice";
import motounData from "../../data/motoun.json";
import nourData from "../../data/nour-alyakine.json";
import fiqhData from "../../data/fiqh.json";
import year1Meetings from "../../data/years/year1/meetings-flat.json";
import year2Meetings from "../../data/years/year2/meetings-flat.json";
import year3Meetings from "../../data/years/year3/meetings-flat.json";
import year4Meetings from "../../data/years/year4/meetings-flat.json";
import year5Meetings from "../../data/years/year5/meetings-flat.json";
import dorarData from "../../data/dorarData.json";
import bjomaaData from "../../data/bjomaaData.json";
import React, { useState } from "react";
import FiqhDetailsModal from "../MovieModal/FiqhDetailsModal.jsx";

export default function SideBar() {
  const [openModal, setOpenModal] = useState(null);

  const dispatch = useDispatch();

  const categories = [
    {
      id: "meeting",
      title: "فوائد و عبر من اللقاءات المباشرة",
      videos: [
        ...year1Meetings.map((v) => ({ ...v, year: 1 })),
        ...year2Meetings.map((v) => ({ ...v, year: 2 })),
        ...year3Meetings.map((v) => ({ ...v, year: 3 })),
        ...year4Meetings.map((v) => ({ ...v, year: 4 })),
        ...year5Meetings.map((v) => ({ ...v, year: 5 })),
      ],
    },
    {
      id: "nour",
      title: "سلسلة في السيرة مع الدكتور منير كمنتري",
      videos: nourData,
    },
    {
      id: "bjomaa",
      title: "سلسلة في العقيدة النورية مع الاستاذ محمد بن جمعة",
      videos: bjomaaData,
    },
    { id: "dorar", title: "درر مشايخنا", videos: dorarData },
    { id: "motoun", title: "المتون الشرعية", videos: motounData },
    {
      id: "fiqh",
      title: " قضايا معاصرة فقه العبادات",
      videos: fiqhData,
      details: `
كتاب « فقه العبادات على المذهب المالكي »، هو حصيلة ما ألقاه الشيخ
« الحبيب بن طاهر »، خلال الدورات التكوينية التي نظمت للسادة أئمة
الخمس والمؤذنين بمساجد تونس طيلة عشر سنوات...

اعتمد الشيخ في كتابه « فقه العبادات على المذهب المالكي »،
بالأساس على كتاب "أقرب المسالك للشيخ الدردير"...
`,
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
        <div key={cat.id} className="text-center mb-2">
          {/* titre principal */}
          <div
            className="flex items-center justify-center gap-3"
            style={{ direction: "rtl" }}
          >
            {/* titre principal */}
            <div
              onClick={() => dispatch(setGenre(cat))}
              className="cursor-pointer hover:bg-cyan-600 font-bold px-2"
              style={{
                fontFamily: "'Arabic Typesetting', serif",
                fontSize: "40px",
                color: "yellow",
                whiteSpace: "nowrap",
              }}
            >
              {cat.title}
            </div>

            {/* bouton details */}
            {cat.details && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(cat);
                }}
                className="cursor-pointer underline"
                style={{
                  fontSize: "16px",
                  color: "#ffd700",
                  fontFamily: "Amiri",
                  opacity: 0.9,
                }}
              >
                اضغط للمزيد
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
