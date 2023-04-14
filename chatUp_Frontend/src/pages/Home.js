import React, { useEffect, useRef, useState } from "react";
import { MobileSideBar, LgScreenSideBar } from "../components";
import { Outlet, useLoaderData } from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";

function Home() {
  const { setUserData } = useGcontex();
  const udata = useLoaderData();
  const scrollRef = useRef(null);

  useEffect(() => {
    setUserData(udata);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out relative">
      <LgScreenSideBar />
      <MobileSideBar />
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
