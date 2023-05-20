import React, { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../asset/logo.png";
import { HiHome } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { useGcontex } from "../hooks/ContextProvider";
import { categories } from "../utils/GROQqueries";
import { AiFillCloseCircle } from "react-icons/ai";
import { googleLogout } from "@react-oauth/google";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold  transition-all duration-200 ease-in-out capitalize";

function Sidebar({ closeToggle }) {
  function handleCloseSidebar() {
    if (closeToggle) closeToggle(false);
  }
  const navigate = useNavigate();
  const { userData } = useGcontex();
  const categoriesLink = useMemo(() =>
    categories.slice(0, categories.length - 1).map(category => (
      <NavLink
        to={`/category/${category.name}`}
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }
        onClick={() => handleCloseSidebar()}
        key={category.name}
      >
        {category.name}
      </NavLink>
    ))
  );
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar border-r-2 border-gray-200 border-collapse">
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-4">
          <Link
            to="/"
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center flex-1"
            onClick={() => handleCloseSidebar()}
          >
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <div className=" md:hidden p-2 my-8">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer text-cyan-400"
              onClick={() => handleCloseSidebar()}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t-2 border-gray-200 pt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => handleCloseSidebar()}
          >
            <HiHome />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categoriesLink}
        </div>
      </div>
      {userData && (
        <div className="flex justify-between items-center mt-10 p-3">
          <Link
            to={`user-profile/${userData._id}`}
            className="flex  gap-2 items-center bg-white rounded-lg flex-1"
            onClick={() => handleCloseSidebar()}
          >
            <img
              src={userData.image}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
              referrerPolicy="no-referrer"
            />
            <p>{userData.firstName}</p>
            <IoIosArrowForward />
          </Link>
          <button
            className="rounded py-1 px-2 hover:bg-red-500 border hover:text-white text-slate-500 font-semibold"
            onClick={() => {
              if (confirm("Do you want to logout? ")) {
                navigate("/login", { replace: true });
                googleLogout();
                localStorage.clear();
              }
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Sidebar);
