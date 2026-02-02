import { useDispatch } from "react-redux";
import { setGenre } from "../../redux/reducers/selectedGenresSlice";

import bayan from "../../data/dorardata/dorar1/bayan.json";
import hikma from "../../data/dorardata/dorar2/hikma.json";
import book from "../../data/dorardata/dorar3/bookdorar.json";
import nafahat1 from "../../data/dorardata/dorar4/nafahat1.json";
import nafahat2 from "../../data/dorardata/dorar5/nafahat2.json";

export default function DorarLeftPanel() {
  const dispatch = useDispatch();
  const nafahat = [...nafahat1, ...nafahat2];

  const btn =
    "bg-neutral-800 hover:bg-cyan-700 text-white py-3 rounded text-lg";

  const load = (title, data) =>
    dispatch(
      setGenre({
        id: "dorar-content",
        title,
        videos: data,
      }),
    );

  return (
    <div className="flex flex-col gap-3 p-3">
      <button className={btn} onClick={() => load("البيان", bayan)}>
        البيان
      </button>
      <button className={btn} onClick={() => load("الحكمة", hikma)}>
        الحكمة
      </button>
      <button className={btn} onClick={() => load("درر من الكتب", book)}>
        درر من الكتب
      </button>
      <button className={btn} onClick={() => load("النفحات والخواطر", nafahat)}>
        النفحات والخواطر
      </button>
    </div>
  );
}
