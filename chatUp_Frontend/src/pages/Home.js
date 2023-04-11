import React, { useEffect, useRef, useState } from "react";
import { Sidebar, Pin } from "../components";
import { client } from "../sanityConfig";
import logo from "../asset/logo.svg";
import { HiMenu } from "react-icons/hi";
import { Link, Route, Routes } from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";
import Pins from "../components/Pins";
import { AiFillCloseCircle } from "react-icons/ai";
import UserProfile from "./UserProfile";
import { userQuery } from "../utils/data";
function Home() {
  // fetch the current loggedin user's sanity id that was stored in localstorage via login
  const [user_id, setUser_id] = useState(() => localStorage.getItem("user_id"));
  //   get user data from the global context
  const { userData, setUserData } = useGcontex();
  //   sidebar state
  const [toggleSidebar, setToggleSidebar] = useState(false);

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
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer text-cyan-400"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-16" />
          </Link>
          <Link to={`user-profile/${userData?._id}`}>
            <img
              src={userData?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
            />
          </Link>
        </div>
        {
          <div
            className={`fixed w-2/4 bg-white h-screen overflow-y-auto shadow-md z-10 ease-in-out duration-300 ${
              toggleSidebar ? "translate-x-0" : "-translate-x-full "
            }`}
          >
            <div className="absolute w-full flex justify-end items-center p-2 my-8">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer text-cyan-400"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        }
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={userData && userData} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
