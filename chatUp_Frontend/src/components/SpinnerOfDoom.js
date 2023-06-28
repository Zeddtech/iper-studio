import logo from "../asset/logo.png";

function SpinnerOfDoom() {
  console.log("SpinnerOfDoom rendered ");

  return (
    <section className="bg-white-900 relative place-items-center grid h-screen w-screen gap-4">
      {/* <!--   ITEM 1 --> */}
      <div className="bg-cyan-400 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl"></div>
      {/* <!--   ITEM 2 --> */}
      <div className="bg-cyan-300 w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
      {/* <!--   ITEM 3 --> */}
      <div className="bg-white/50 w-24 h-24 absolute animate-ping rounded-full shadow-xl"></div>
      {/* <!--   SVG LOGO --> */}
      <img
        src={logo}
        alt=""
        className="text-blue-900 filter mix-blend-overlay w-32"
      />
    </section>
  );
}
export function Loader() {
  console.log("Loader rendered ");
  return (
    <section className="bg-white-900 relative place-items-center grid flex-1 gap-4">
      {/* <!--   ITEM 1 --> */}
      <div className="bg-cyan-400 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl"></div>
      {/* <!--   ITEM 2 --> */}
      <div className="bg-cyan-300 w-32 h-32 absolute animate-ping rounded-full shadow-xl"></div>
      {/* <!--   ITEM 3 --> */}
      <div className="bg-white/50 w-24 h-24 absolute animate-ping rounded-full shadow-xl"></div>
      {/* <!--   SVG LOGO --> */}
      <img src={logo} alt="" className="text-blue-900 w-32" />
    </section>
  );
}
export default SpinnerOfDoom;
