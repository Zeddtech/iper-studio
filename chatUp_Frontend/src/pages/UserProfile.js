import React, { Suspense, useEffect, useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Await, useLoaderData } from "react-router-dom";

import MasonryLayout from "../components/MansoryLayout";
import Spinner from "../components/Spinner";

const notActiveBtnStyles =
  "bg-primary  text-black font-bold p-2  w-20 outline-none hover:bg-gray-200 transition duration-300 rounded-t";

function UserProfile() {
  const { user, userCreatedPins, userSavedPins } = useLoaderData();
  const [activeBtn, setActiveBtn] = useState("created");
  const Created = useRef();
  const Saved = useRef();
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState();
  useEffect(() => {
    activeBtn == "created"
      ? setTabUnderlineLeft(Created.current.offsetLeft)
      : setTabUnderlineLeft(Saved.current.offsetLeft);
    console.log(tabUnderlineLeft);
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
              className="rounded-full w-[18.88%] aspect-[1/1] -mt-[9.44%] ms-10 border-4 border-white object-cover min-w-[45px] max-w-[145px] 979:-mt-[72px] "
              src={user[0].image}
              alt="user-pic"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="">
            <div className=" flex flex-col gap-5 mb-5 px-10">
              <div className="flex w-full font-hel justify-between ">
                <h1 className=" text-2xl mt-1 text-slate-700">
                  {user[0]?.firstName + "  " + user[0].lastName}
                </h1>
                <div className="border border-cyan-400 font-semibold grid place-items-center px-2 py-1 rounded-full text-cyan-400 text-sm hover:text-white hover:bg-cyan-400 transition-all ">
                  Edit profile
                </div>
              </div>
              <p className="mb-6 text-[15px] text-slate-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
                officia voluptates illo itaque iste beatae sit quidem veniam,
                atque nemo!
              </p>
            </div>

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

            <div className="text-center mb-7 flex  border-b justify-around relative gap-3">
              <button
                type="button"
                ref={Created}
                onClick={e => {
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
                  errorElement={
                    <div className="p-5 pb-20 text-center text-slate-600 font-semibold">
                      Could not load similar pipes 😬
                    </div>
                  }
                >
                  {pins => {
                    return pins?.length === 0 ? (
                      <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                        No Pins Found!
                      </div>
                    ) : (
                      <MasonryLayout pins={pins} />
                    );
                  }}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
