import React from "react";

import logo from "../asset/logo.png";
function SpinnerOfDoom() {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
    //   <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md rounded-lg">
    //     <div className="animate-pulse flex flex-col">
    //       <div className="rounded w-full h-52 bg-gray-200"></div>
    //       <div className="flex flex-col mt-5">
    //         <div className="w-full h-5 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="flex items-center mt-5">
    //         <div>
    //           <div className="rounded-full bg-gray-200 w-10 h-10"></div>
    //         </div>
    //         <div className="flex justify-between w-full ml-3">
    //           <div className="w-5/12 h-3 bg-gray-200 rounded"></div>
    //           <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md rounded-lg">
    //     <div className="animate-pulse flex flex-col">
    //       <div className="rounded w-full h-52 bg-gray-200"></div>
    //       <div className="flex flex-col mt-5">
    //         <div className="w-full h-5 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="flex items-center mt-5">
    //         <div>
    //           <div className="rounded-full bg-gray-200 w-10 h-10"></div>
    //         </div>
    //         <div className="flex justify-between w-full ml-3">
    //           <div className="w-5/12 h-3 bg-gray-200 rounded"></div>
    //           <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md rounded-lg">
    //     <div className="animate-pulse flex flex-col">
    //       <div className="rounded w-full h-52 bg-gray-200"></div>
    //       <div className="flex flex-col mt-5">
    //         <div className="w-full h-5 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="flex items-center mt-5">
    //         <div>
    //           <div className="rounded-full bg-gray-200 w-10 h-10"></div>
    //         </div>
    //         <div className="flex justify-between w-full ml-3">
    //           <div className="w-5/12 h-3 bg-gray-200 rounded"></div>
    //           <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md rounded-lg">
    //     <div className="animate-pulse flex flex-col">
    //       <div className="rounded w-full h-52 bg-gray-200"></div>
    //       <div className="flex flex-col mt-5">
    //         <div className="w-full h-5 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //         <div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
    //       </div>

    //       <div className="flex items-center mt-5">
    //         <div>
    //           <div className="rounded-full bg-gray-200 w-10 h-10"></div>
    //         </div>
    //         <div className="flex justify-between w-full ml-3">
    //           <div className="w-5/12 h-3 bg-gray-200 rounded"></div>
    //           <div className="w-2/12 h-3 bg-gray-200 rounded"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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

export default SpinnerOfDoom;
