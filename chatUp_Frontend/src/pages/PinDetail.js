import React, { Suspense, useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import {
  Await,
  Link,
  useLoaderData,
  useRevalidator,
  useRouteLoaderData,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { urlFor } from "../sanityConfig";

import Spinner from "../components/Spinner";
import MasonryLayout from "../components/MansoryLayout";
import { savePin } from "../utils/managePins";
import { AiOutlineLink } from "react-icons/ai";

function PinDetail() {
  // eslint-disable-next-line no-unused-vars
  const { pinDetail, similarPins } = useLoaderData();
  const user = useRouteLoaderData("root");
  const [hasSavedPost, sethasSavedPost] = useState(() =>
    pinDetail?.savedBy?.map(item => item?.savedBy?._id)?.includes(user?._id)
  );
  const [savingPost, setSavingPost] = useState(false);
  const [savedCount, setSavedCount] = useState(pinDetail?.savedBy?.length);
  const [comment, setComment] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [addingComment, setAddingComment] = useState(false);
  const revalidator = useRevalidator();
  if (revalidator.state == "loading") {
    return (
      <Spinner message={"Adding new fun Pipes to your feed, dont leave!! "} />
    );
  }
  useEffect(() => {}, [pinDetail]);
  function addComment() {
    if (!addingComment) {
      setAddingComment(true);
    }
  }
  console.log(pinDetail);
  const date = new Date("2023-04-15T18:05:57Z");
  console.log(similarPins);
  return (
    <div className="lg:flex lg:flex-row lg:gap-3">
      {pinDetail && (
        <div
          className="flex flex-col m-auto lg:m-0 bg-white "
          style={{ maxWidth: "600px", minWidth: "300px" }}
        >
          <div className="px-4 flex flex-col pb-0">
            <Link
              to={`/user-profile/${pinDetail?.postedBy._id}`}
              className="flex gap-3 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postedBy.image}
                className="w-12 h-12 rounded-full "
                alt="user-profile"
                referrerPolicy="no-referrer"
              />
              <p className="font-bold hover:text-cyan-400 text-[15px]">
                {pinDetail?.postedBy.firstName +
                  " " +
                  pinDetail?.postedBy.lastName}
              </p>
            </Link>
            <div>
              <h1 className=" font-bold break-words mt-5 capitalize text-center text-[17px]">
                {pinDetail.title}
              </h1>
              <p className="my-3 text-slate-600 text-[17px] ">
                {pinDetail.about}
              </p>
            </div>
            <div className="flex justify-center items-center md:items-start flex-initial rounded-t-3xl rounded-b-lg ">
              <img
                className="rounded-t-3xl rounded-b-lg"
                src={pinDetail?.imageUrl && urlFor(pinDetail?.imageUrl)}
                alt="pipe"
              />
            </div>
            <div className="w-full flex align-center text-slate-500 py-5 text-sm text-[15px]">
              {date.toLocaleTimeString()} . {date.toDateString()} ·{" "}
              <span className="ms-2 font-black">
                {savedCount || 0}{" "}
                {savedCount ? (savedCount > 1 ? "Saves" : "Save") : "Save"}
              </span>
            </div>
            <div className="w-full  flex-1 xl:min-w-620">
              <div className="grid grid-cols-3 py-3 border-y-2 border-slate-200 justify-items-center	items-center">
                <div className="flex  items-center">
                  <a
                    href={`${pinDetail.imageUrl}?dl=`}
                    download
                    className="bg-secondaryColor p-2 text-2xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 hover:text-cyan-400 transition"
                    title="download pipe"
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>

                {hasSavedPost ? (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none border-x border-slate-200"
                  >
                    Saved
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (!hasSavedPost) {
                        setSavingPost(true);
                        savePin(
                          pinDetail?._id,
                          user?._id,
                          setSavedCount,
                          setSavingPost,
                          sethasSavedPost
                        );

                        // console.log(res);
                      }
                    }}
                    type="button"
                    className="bg-white opacity-70 hover:opacity-100 text-red-500 font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none border border-red-500"
                    disabled={savingPost}
                  >
                    {savingPost ? "Saving ..." : "Save"}
                  </button>
                )}
                <a
                  href={pinDetail.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl bg-secondaryColor p-2  rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 hover:text-cyan-400 transition"
                  title="Pipe Url Destination"
                >
                  <AiOutlineLink />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-6  sm:flex sm:flex-row py-3 gap-2">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-8 h-8 rounded-full cursor-pointer col-span-1"
                  alt="user-profile"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <input
                className=" col-span-3 flex-1 outline-none border-0 p-2 tracking-wide	 "
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-cyan-400 text-white rounded-full sm:px-4 sm:py-2 font-semibold text-base outline-none text-sm hover:bg-cyan-500 transition col-span-2"
                onClick={addComment}
                disabled={!comment}
              >
                {addingComment ? "commenting..." : "Comment"}
              </button>
            </div>
          </div>
          <div className="border-t-2 border-slate-200">
            {pinDetail?.comments ? (
              pinDetail?.comments?.map(item => (
                <div
                  className="flex gap-3 p-5  bg-white  hover:bg-[rgba(0,0,0,0.03)]
                  transition-colors	border-b border-slate-200"
                  key={item._key}
                >
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-sm">
                      {item?.postedBy.firstName + " " + item?.postedBy.lastName}
                      <span className="ms-2"></span>
                    </p>
                    <p className="text-sm text-slate-500 py-1 text-[15px]">
                      {item.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 text-center w-full text-slate-400 text-sm font-bold">
                no comments
              </div>
            )}
          </div>
        </div>
      )}

      <Suspense fallback={<Spinner message={"loading similar pipes"} />}>
        <Await
          resolve={similarPins}
          errorElement={<div>Could not load similar pipes 😬</div>}
        >
          {resolvedSimilarPins => (
            <div className="bg-white px-3 xl:px-4">
              <h2 className="text-center font-bold text-xl mt-8 mb-4">
                More like this
              </h2>
              <MasonryLayout
                pins={resolvedSimilarPins}
                bp={{
                  default: 4,
                  3000: 1,
                  1024: 1,
                  1023: 3,
                  1000: 2,
                  500: 1,
                }}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
export default PinDetail;
