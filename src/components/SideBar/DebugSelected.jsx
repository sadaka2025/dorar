import { useSelector } from "react-redux";

export default function DebugSelected() {
  const g = useSelector((s) => s.selectedGenre);

  return (
    <pre className="p-4 text-white">
      {JSON.stringify(
        {
          id: g.id,
          title: g.title,
          videosCount: g.videos?.length,
        },
        null,
        2,
      )}
    </pre>
  );
}
