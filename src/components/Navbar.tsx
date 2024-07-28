import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="h-[10vh] px-10 py-5 flex justify-between place-items-center border-0">
      <h1 className="whitespace-pre-wrap  dark:text-white  text-center text-2xl font-bold leading-none tracking-tighter text-slate-900">
        SN.
      </h1>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
