import RetroGrid from "@/components/magicui/retro-grid";
import Navbar from "./components/Navbar";
import BlurFade from "@/components/magicui/blur-fade";
import { DockDemo } from "./components/DockDemo";

export default function App() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="relative flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl border-0">
        <span className="pointer-events-none z-10 whitespace-pre-wrap dark:text-white text-slate-900 text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
          <section id="header">
            <BlurFade delay={0.25} inView>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Making Shit Since 2020 🌟.
              </h2>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              <span className="text-xl text-pretty tracking-tighter sm:text-3xl xl:text-4xl/none">
                Nice to meet you
              </span>
            </BlurFade>
          </section>
        </span>
        <RetroGrid className="shadow-none drop-shadow-none" />
        <div className="fixed bottom-2">
        <DockDemo/>
        </div>
      </div>
      <div className="h-screen">

      </div>
    </div>
  );
}
