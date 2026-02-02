import { useSelector } from "react-redux";

export default function DorarPage() {
  const { title, videos } = useSelector((s) => s.selectedGenre);

  if (!videos.length) {
    return <div className="p-6 text-gray-400">اختر زرًا لعرض المحتوى</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4 text-yellow-400">{title}</h1>

      <ul className="space-y-3">
        {videos.map((v, i) => (
          <li
            key={i}
            className="p-3 bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded"
          >
            {v.title || v.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
