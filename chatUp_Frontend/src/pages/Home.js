import React, { useEffect, useRef } from "react";
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
    <div className="flex bg-white md:flex-row flex-col h-screen transition-height duration-75 ease-out relative">
      <LgScreenSideBar />
      <MobileSideBar />
      <div className="flex-1 overflow-y-scroll h-screen">
        <div className="pb-2  max-w-7xl	m-auto" ref={scrollRef}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
