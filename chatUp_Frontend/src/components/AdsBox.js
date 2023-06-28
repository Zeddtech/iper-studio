import React from "react";

function AdsBox() {
  console.log("adsbox ran");
  return (
    <div
      className="h-full aspect-video flex items-center justify-center border rounded-xl hover:bg-slate-50 cursor-pointer max-w-[100%] m-auto"
      title="COMING SOON"
    >
      <p className="text-cyan-500 font-semibold">ADS</p>
    </div>
  );
}

export default AdsBox;
