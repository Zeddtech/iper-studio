import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link, useRouteLoaderData } from "react-router-dom";
import logo from "../asset/logo.png";
// import { useGcontex } from "../hooks/ContextProvider";
import Sidebar from "./Sidebar";
function MobileSideBar() {
  //   sidebar state
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const userData = useRouteLoaderData("root");
  return (
    <>
      {toggleSidebar && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay z-[10] md:hidden "
          onClick={() => setToggleSidebar(false)}
        ></div>
      )}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer text-cyan-400"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${userData?._id}`}>
            <img
              src={userData?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full "
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
        {
          <div
            className={`fixed w-2/4 bg-white h-screen overflow-y-auto shadow-md z-20 ease-in-out duration-300 ${
              toggleSidebar ? "translate-x-0" : "-translate-x-full "
            }`}
          >
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        }
      </div>
    </>
  );
}

export default React.memo(MobileSideBar);
