import React from "react";
import Sidebar from "./Sidebar";

function LgScreenSideBar() {
  console.log("LgScreenSideBar ran");
  return (
    <div className="hidden md:flex h-screen flex-initial">
      <Sidebar />
    </div>
  );
}

export default React.memo(LgScreenSideBar);
