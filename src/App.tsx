import RetroGrid from "@/components/magicui/retro-grid";
import Navbar from "./components/Navbar";
import { DockDemo } from "./components/DockDemo";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="relative flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl border-0">
        <Outlet />
        <RetroGrid className="shadow-none drop-shadow-none" />
        <div className="fixed bottom-2">
          <DockDemo />
        </div>
      </div>
    </div>
  );
}
