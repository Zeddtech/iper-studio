import React, { useEffect, useRef } from "react";
import { MobileSideBar, LgScreenSideBar } from "../components";
import { Outlet, useLoaderData } from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{
          duration: 10,
          type: "spring",
          stifiness: 260,
          damping: 20,
        }}
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}

export default Home;
