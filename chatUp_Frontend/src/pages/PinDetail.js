import React, { Suspense, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import {
  Await,
  Link,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";

import { urlFor } from "../sanityConfig";

import Spinner from "../components/Spinner";
import MasonryLayout from "../components/MansoryLayout";
import { saveComment, savePin } from "../utils/managePins";
import { AiOutlineLink } from "react-icons/ai";

function PinDetail() {
  const { pinDetail, similarPins } = useLoaderData();
  const user = useRouteLoaderData("root");
  const [hasSavedPost, sethasSavedPost] = useState(() =>
    pinDetail?.savedBy?.map(item => item?.savedBy?._id)?.includes(user?._id)
  );
  const [savingPost, setSavingPost] = useState(false);
  const [savedCount, setSavedCount] = useState(pinDetail?.savedBy?.length);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [allComments, setAllComments] = useState(pinDetail?.comments);
  function addComment() {
    if (!addingComment) {
      setAddingComment(true);
      saveComment(user._id, pinDetail._id, comment).then(() => {
        setAllComments(prev => [
          {
            _key: comment,
            comment,
            date: new Date().toISOString(),
            postedBy: {
              firstName: user.firstName,
              lastName: user.lastName,
              _id: user._id,
              image: user.image,
            },
          },
          ...prev,
        ]);
        setAddingComment(false);
        setComment("");
      });
    }
  }
  const date = new Date(pinDetail._createdAt);
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
                src={pinDetail?.image && urlFor(pinDetail?.image).url()}
                alt="pipe"
              />
            </div>
            <div className="w-full flex align-center text-slate-500 py-5 text-sm text-[15px]">
              {date.toLocaleTimeString()}
              <span className="font-bold px-1"> · </span>
              {date.toDateString()}
              <span className="font-bold px-1"> · </span>
              <span className="ms-2 font-black">
                {savedCount || 0}
                {savedCount ? (savedCount > 1 ? "Saves" : "Save") : "Save"}
              </span>
            </div>
            <div className="w-full  flex-1 xl:min-w-620">
              <div className="grid grid-cols-3 py-3 border-y-2 border-slate-200 justify-items-center	items-center">
                <div className="flex  items-center">
                  <a
                    href={`${urlFor(pinDetail.image).url()}?dl=`}
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
            <div
              className=" max-[370px]:grid
               max-[370px]:grid-cols-6 flex flex-row py-3 gap-2"
            >
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-8 h-8 rounded-full cursor-pointer col-span-1"
                  alt="user-profile"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <input
                className=" col-span-3 flex-1 outline-none border-0  tracking-wide	 "
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-cyan-400 text-white rounded-full px-2 py-1 font-semibold outline-none hover:bg-cyan-500 transition col-span-2 text-[13px]"
                onClick={addComment}
                disabled={!comment}
              >
                {addingComment ? "adding comment..." : "Comment"}
              </button>
            </div>
          </div>
          <div className="border-t-2 border-slate-200">
            {allComments ? (
              allComments?.map(item => (
                <div
                  className="flex gap-3 p-5  bg-white  hover:bg-[rgba(0,0,0,0.03)]
                  transition-colors	border-b border-slate-200"
                  key={item._key}
                >
                  <Link to={`/user-profile/${item.postedBy?._id}`}>
                    <img
                      src={item.postedBy?.image}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <p className="font-bold text-sm">
                      <Link
                        to={`/user-profile/${item.postedBy?._id}`}
                        className="hover:underline"
                      >
                        {item?.postedBy?.firstName +
                          " " +
                          item?.postedBy?.lastName}
                      </Link>

                      <span
                        className="ms-3 text-slate-500 font-light text-sm"
                        title={
                          item.date && new Date(item.date).toLocaleString()
                        }
                      >
                        <span className="text-slate-500 font-bold pe-1">·</span>
                        {item.date &&
                          new Date(item.date).toDateString().substring(4, 10)}
                      </span>
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
          errorElement={
            <div className="p-5 pb-20 text-center text-slate-600 font-semibold">
              Could not load similar pipes 😬
            </div>
          }
        >
          {resolvedSimilarPins => (
            <div className="bg-white px-3 xl:px-4">
              <h2 className="text-center font-bold text-xl pt-8 pb-4">
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
