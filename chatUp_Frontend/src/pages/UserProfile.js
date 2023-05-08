import React, { Suspense, useEffect, useRef, useState } from "react";
import { AiOutlineCalendar, AiOutlineLink } from "react-icons/ai";
import { GrFacebook, GrInstagram } from "react-icons/gr";
import { CiLocationOn } from "react-icons/ci";
import { Await, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { format } from "date-fns";
import MasonryLayout from "../components/MansoryLayout";
import Spinner from "../components/Spinner";
import { BsBalloon } from "react-icons/bs";
import { getSavesCount } from "../utils/helperFunctions";
import image from "../asset/userimage placeholder.jpg";
const notActiveBtnStyles =
  "bg-primary  text-black font-bold p-2  w-20 outline-none hover:bg-gray-200 transition duration-300 rounded-t";

function UserProfile() {
  const { user, userCreatedPins, userSavedPins, userActivity } =
    useLoaderData();
  const loginuser = useRouteLoaderData("root");
  const [activeBtn, setActiveBtn] = useState("created");
  const Created = useRef();
  const Saved = useRef();
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState();
  useEffect(() => {
    activeBtn == "created"
      ? setTabUnderlineLeft(Created?.current?.offsetLeft)
      : setTabUnderlineLeft(Saved?.current?.offsetLeft);
  }, [activeBtn]);
  return (
    <div className="relative pb-2 h-full justify-center items-center bg-white">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center ">
            <img
              className=" w-full aspect-[3/1]  object-cover "
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-[18.88%] aspect-[1/1] -mt-[9.44%] ms-10 border-4 border-white object-cover min-w-[45px] max-w-[145px] 979:-mt-[72px] lg:ms-[2%] xl:ms-[4%] 2xl:ms-[6%]"
              src={user[0]?.image || image}
              alt="user-pic"
              referrerPolicy="no-referrer"
            />
          </div>
          {user.length < 1 ? (
            <div className="h-[200px] flex flex-col gap-1 items-center justify-center text-slate-500">
              <p className="text-2xl font-semibold text-center">
                This user account doesn&apos;t exist
              </p>
              <p className="text-sm text-center">
                Try searching for another user account
              </p>
            </div>
          ) : (
            <div className="lg:max-w-[63%]  m-auto lg:-mt-8">
              <div className=" flex flex-col gap-5 mb-12 px-10 lg:px-0">
                <div className="flex w-full font-hel justify-between ">
                  <h1 className=" text-xl md:text-2xl mt-1 text-slate-950 font-semibold">
                    {user[0]?.firstName + "  " + user[0]?.lastName}
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className=" text-2xl gap-2 hidden min-[425px]:flex">
                      <GrFacebook className="text-[#3b5998] rounded" />

                      <GrInstagram className="text-white insta p-[2px] rounded" />
                    </div>
                    <div className="border border-cyan-400 font-semibold grid place-items-center px-2 py-1 rounded-full text-cyan-400 text-sm hover:text-white hover:bg-cyan-400 transition-all lg:text-base ">
                      Edit profile
                    </div>
                  </div>
                </div>

                {user[0]?.bio && (
                  <p className=" text-[15px] text-slate-600">{user[0]?.bio}</p>
                )}
                <div className="flex  flex-wrap gap-3 text-slate-600">
                  {user[0]?.location && (
                    <p className="flex justify-center gap-1 items-center">
                      <span>
                        <CiLocationOn color="#475569" />
                      </span>
                      {user[0]?.location}
                    </p>
                  )}
                  {user[0]?.birthDay && (
                    <p className="flex  gap-1 items-center">
                      <span>
                        <BsBalloon />
                      </span>
                      Born {format(new Date(user[0]?.birthDay), "MMMM do")}
                      {user[0]?._id === loginuser._id && (
                        <span>
                          ,{format(new Date(user[0]?.birthDay), "yyyy")}
                        </span>
                      )}
                    </p>
                  )}
                  {user[0]?._createdAt && (
                    <p className=" flex  gap-1 items-center">
                      <span>
                        <AiOutlineCalendar />
                      </span>
                      Joined{"  "}
                      {format(new Date(user[0]?._createdAt), "MMMM do, yyyy")}
                    </p>
                  )}
                  {user[0]?.website && (
                    <a
                      href={user[0]?.website}
                      target="blank"
                      rel="noreferrer"
                      className="flex hover:underline cursor-pointer gap-1 items-center
                  "
                    >
                      <span>
                        <AiOutlineLink />
                      </span>
                      {user[0]?.website.substring(0, 30) + "..."}
                    </a>
                  )}
                </div>
                <Suspense
                  fallback={
                    <div className="flex gap-3 animate-pulse">
                      <p className=" flex gap-1 bg-gray-300 w-[78px] h-[20px]"></p>
                      <p className=" flex gap-1 bg-gray-300 w-[78px] h-[20px]"></p>
                      <p className=" flex gap-1 bg-gray-300 w-[78px] h-[20px]"></p>
                    </div>
                  }
                >
                  <Await resolve={userActivity} errorElement={<div></div>}>
                    {activity => (
                      <div className="flex gap-3 text-[12px] sm:text-sm">
                        <p className="text-slate-400 text-sm flex gap-1">
                          <span className="text-slate-800">
                            {activity.createdCount}
                          </span>
                          Pipes
                        </p>
                        <p className="text-slate-400 text-sm flex gap-1">
                          <span className="text-slate-800">
                            {activity.savedCount}
                          </span>
                          Saved
                        </p>
                        <p className="text-slate-400 text-sm flex gap-1">
                          <span className="text-slate-800">
                            {getSavesCount(activity.savesGotten)}
                          </span>
                          Saves
                        </p>
                      </div>
                    )}
                  </Await>
                </Suspense>
              </div>

              <div className="text-center mb-7 flex  border-b justify-around relative gap-3">
                <button
                  type="button"
                  ref={Created}
                  onClick={() => {
                    setActiveBtn("created");
                  }}
                  className={notActiveBtnStyles}
                >
                  Created
                </button>
                <button
                  type="button"
                  ref={Saved}
                  onClick={() => {
                    setActiveBtn("saved");
                  }}
                  className={notActiveBtnStyles}
                >
                  Saved
                </button>
                <span
                  className="absolute w-20 h-1 bottom-0 block transition-all duration-300 bg-cyan-400"
                  style={{
                    left: tabUnderlineLeft,
                  }}
                ></span>
              </div>

              <div className="px-2">
                <Suspense
                  fallback={<Spinner message={"loading similar pipes"} />}
                >
                  <Await
                    resolve={
                      activeBtn == "created" ? userCreatedPins : userSavedPins
                    }
                  >
                    {pins => {
                      return pins?.length === 0 ? (
                        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                          No Pins Found!
                        </div>
                      ) : (
                        <MasonryLayout
                          pins={pins}
                          bp={{
                            default: 4,
                            2000: 3,
                            1000: 2,
                            500: 1,
                          }}
                        />
                      );
                    }}
                  </Await>
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
