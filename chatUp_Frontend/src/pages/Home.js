import React, { useEffect, useRef } from "react";
import { MobileSideBar, LgScreenSideBar } from "../components";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";
import Footer from "../components/Footer";

import SpinnerOfDoom from "../components/SpinnerOfDoom";

function Home() {
  const { setUserData } = useGcontex();
  const udata = useLoaderData();
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const location = useLocation();
  useEffect(() => {
    setUserData(udata);
  }, []);

  return (
    <div className="flex bg-white md:flex-row flex-col h-screen transition-height duration-75 ease-out relative">
      <LgScreenSideBar />
      <MobileSideBar />
      <div className="flex-1 overflow-y-scroll h-screen flex justify-between flex-col">
        {navigation.state == "loading" &&
        navigation.location.pathname !== location.pathname ? (
          <SpinnerOfDoom />
        ) : (
          <div className="pb-2  max-w-7xl	mx-auto" ref={scrollRef}>
            <Outlet />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
