import React, { useEffect, useRef, useState } from "react";
import { MobileSideBar, LgScreenSideBar } from "../components";
import { client } from "../sanityConfig";
import { Outlet, useLoaderData } from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";
import { userQuery } from "../utils/data";

function Home() {
  // fetch the current loggedin user's sanity id that was stored in localstorage via login
  const [user_id, setUser_id] = useState(() => localStorage.getItem("user_id"));
  console.log(useLoaderData());
  //   get user data from the global context
  const { setUserData } = useGcontex();

  const scrollRef = useRef(null);

  // fetch the current logged in user info from sanity
  useEffect(() => {
    if (user_id) {
      const userquery = userQuery(user_id);

      client.fetch(userquery).then(res => setUserData(res[0]));
    }
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
