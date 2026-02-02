import { useDispatch } from "react-redux";
import { setSelectedGenre } from "../../redux/reducers/selectedGenresSlice";

export default function DorarTopButtons() {
  const dispatch = useDispatch();

  const btn = "px-4 py-2 bg-gray-700 text-yellow-400 rounded";

  return (
    <div className="flex gap-2 justify-center mb-4">
      <button
        className={btn}
        onClick={() =>
          dispatch(
            setSelectedGenre({
              id: "dorar",
              title: "البيان",
              source: "bayan",
            }),
          )
        }
      >
        البيان
      </button>

      <button
        className={btn}
        onClick={() =>
          dispatch(
            setSelectedGenre({
              id: "dorar",
              title: "الحكمة",
              source: "hikma",
            }),
          )
        }
      >
        الحكمة
      </button>

      <button
        className={btn}
        onClick={() =>
          dispatch(
            setSelectedGenre({
              id: "dorar",
              title: "درر من الكتب",
              source: "book",
            }),
          )
        }
      >
        الكتب
      </button>

      <button
        className={btn}
        onClick={() =>
          dispatch(
            setSelectedGenre({
              id: "dorar",
              title: "النفحات",
              source: "nafahat",
            }),
          )
        }
      >
        النفحات
      </button>
    </div>
  );
}
