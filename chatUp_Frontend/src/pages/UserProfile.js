import React, { Suspense, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Await, useParams, useNavigate, useLoaderData } from "react-router-dom";

import MasonryLayout from "../components/MansoryLayout";
import Spinner from "../components/Spinner";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

function UserProfile() {
  const { user, userCreatedPins, userSavedPins } = useLoaderData();
  const [activeBtn, setActiveBtn] = useState("created");
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user[0].image}
              alt="user-pic"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user[0]?.firstName + "  " + user[0].lastName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                // onClick={}
                // disabled={}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            }
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <Suspense fallback={<Spinner message={"loading similar pipes"} />}>
            <Await
              resolve={userSavedPins}
              errorElement={
                <div className="p-5 pb-20 text-center text-slate-600 font-semibold">
                  Could not load similar pipes 😬
                </div>
              }
            >
              {(pins) => <MasonryLayout pins={pins} />}
            </Await>
          </Suspense>
        </div>
        {/* 
        {pins?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )} */}
      </div>
    </div>
  );
}

export default UserProfile;
