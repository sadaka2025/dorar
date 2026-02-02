import DorarTopButtons from "../SideBar/DorarTopButtons";
import DorarPage from "../SideBar/DorarPage";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white">
      <DorarTopButtons />
      <DorarPage />
    </div>
  );
}
