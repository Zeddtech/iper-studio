import React, { useEffect, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";
import { HiArrowLeft } from "react-icons/hi";

function Navbar({ setSearchTerm }) {
  const navigate = useNavigate();
  const { userData } = useGcontex();
  const location = useLocation();
  const inputref = useRef();
  useEffect(() => {
    if (location.pathname.includes("/search")) {
      inputref.current.focus();
    }
  }, []);

  function navigateToSearch() {
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  }
  return (
    <div className="flex gap-2 md:gap-4 w-full mt-5 pb-7 ">
      <button className="rounded-e-full text-xl" onClick={() => navigate(-1)}>
        <HiArrowLeft className=" hover:text-cyan-400" />
      </button>
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <input
          type="text"
          ref={inputref}
          onChange={e => {
            setSearchTerm({ q: e.target.value });
          }}
          placeholder="Search Ipes"
          onFocus={navigateToSearch}
          className="p-2 w-full bg-gray-200 rounded-md outline-none"
        />
      </div>
      <div className="flex gap-3 items-center">
        <Link to={`user-profile/${userData?._id}`} className="hidden md:block">
          <img
            src={userData?.image}
            alt="user-pic"
            className="w-12 h-12 rounded-lg "
            referrerPolicy="no-referrer"
          />
        </Link>
        <Link
          to="/create-pin"
          className="bg-cyan-400 text-white rounded-full w-10 h-10 flex justify-center items-center"
        >
          <IoMdAdd fontSize={20} className="font-black" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
