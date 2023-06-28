import React, { useRef } from "react";
import { MobileSideBar, LgScreenSideBar } from "../components";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";

import { Loader } from "../components/SpinnerOfDoom";

function Home() {
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const location = useLocation();

  return (
    // <div></div>
    <div className="flex bg-white md:flex-row flex-col h-screen transition-height duration-75 ease-out relative ">
      <LgScreenSideBar />
      <MobileSideBar />
      <div className="flex-1 overflow-y-scroll h-screen flex justify-between flex-col">
        {navigation.state == "loading" &&
        navigation.location.pathname !== location.pathname ? (
          <Loader />
        ) : (
          <div
            className="pb-2 animate-Appear  max-w-7xl	mx-auto w-full"
            ref={scrollRef}
          >
            <Outlet />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
