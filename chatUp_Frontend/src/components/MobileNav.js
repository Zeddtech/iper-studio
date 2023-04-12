import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../asset/logo.svg";
import { useGcontex } from "../hooks/ContextProvider";
import Sidebar from "./Sidebar";
function MobileNav() {
  //   sidebar state
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { userData } = useGcontex();
  return (
    <>
      {toggleSidebar && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay z-0 md:hidden "></div>
      )}
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
            className={`fixed w-2/4 bg-white h-screen overflow-y-auto shadow-md z-20 ease-in-out duration-300 ${
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
    </>
  );
}

export default MobileNav;
