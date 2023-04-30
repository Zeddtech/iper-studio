import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useGcontex } from "../hooks/ContextProvider";

function Navbar({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const { userData } = useGcontex();
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
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
