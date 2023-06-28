import React, { Suspense, useState, useRef, memo } from "react";
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
import { saveComment, saveIpe } from "../utils/manageIpes";
import { AiOutlineLink } from "react-icons/ai";
import format from "date-fns/format";
import AdsBox from "../components/AdsBox";
import { v4 as uuidv4 } from "uuid";

function ipeDetail() {
  const { ipeDetail, similarIpes } = useLoaderData();
  const user = useRouteLoaderData("root");
  const commentRef = useRef(null);
  const addCommentBtnRef = useRef(null);

  const [hasSavedPost, sethasSavedPost] = useState(() =>
    ipeDetail?.savedBy?.map(item => item?.savedBy?._id)?.includes(user?._id)
  );
  const [savingPost, setSavingPost] = useState(false);
  const [savedCount, setSavedCount] = useState(ipeDetail?.savedBy?.length);
  const [allComments, setAllComments] = useState(ipeDetail?.comments || []);
  function addComment() {
    let comment = commentRef.current.value.trim();
    if (comment == "") {
      return;
    }
    addCommentBtnRef.current.disabled = true;
    addCommentBtnRef.current.textContent = "adding comment ...";

    saveComment(user._id, ipeDetail._id, comment).then(() => {
      setAllComments(prev => [
        {
          _key: uuidv4(),
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
      addCommentBtnRef.current.disabled = false;
      addCommentBtnRef.current.textContent = "comment";
      commentRef.current.value = "";
    });
  }
  const date = new Date(ipeDetail._createdAt);
  return (
    <div className="lg:flex lg:flex-row lg:gap-5 lg:justify-center">
      {ipeDetail && (
        <div
          className="flex flex-col m-auto lg:m-0 bg-white "
          style={{ maxWidth: "700px", minWidth: "300px" }}
        >
          <div className=" flex flex-col pb-0">
            <Link
              to={`/user-profile/${ipeDetail?.postedBy._id}`}
              className="flex gap-3 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={ipeDetail?.postedBy.image}
                className="w-12 h-12 rounded-full "
                alt="user-profile"
                referrerPolicy="no-referrer"
              />
              <p className="font-bold hover:text-cyan-400 text-[15px]">
                {ipeDetail?.postedBy.firstName +
                  " " +
                  ipeDetail?.postedBy.lastName}
              </p>
            </Link>
            <div>
              <h1 className=" font-bold break-words mt-5 capitalize text-center text-base">
                {ipeDetail.title}
              </h1>
              <p className="my-3 text-slate-600 text-base ">
                {ipeDetail.about}
              </p>
            </div>
            <div className="flex justify-center items-center md:items-start flex-initial rounded-t-3xl rounded-b-lg ">
              <img
                className="rounded-t-3xl rounded-b-lg w-full"
                src={ipeDetail?.image && urlFor(ipeDetail?.image).url()}
                alt="Ipe"
              />
            </div>
            <div className="w-full flex align-center text-slate-500 py-5 text-sm text-[15px]">
              {format(date, "p · MMMM dd, yyyy")}

              <span className="font-bold px-1"> · </span>
              <span className="ms-2 font-black">
                {savedCount || 0}
                {savedCount ? (savedCount > 1 ? " Saves" : " Save") : "Save"}
              </span>
            </div>
            <div className="w-full  flex-1 xl:min-w-620">
              <div className="grid grid-cols-3 py-3 border-y-2 border-slate-200 justify-items-center	items-center">
                <div className="flex  items-center">
                  <a
                    href={`${urlFor(ipeDetail.image).url()}?dl=`}
                    download
                    className="bg-secondaryColor p-2 text-2xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 hover:text-cyan-400 transition"
                    title="download Ipe"
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
                        saveIpe(
                          ipeDetail?._id,
                          user?._id,
                          setSavedCount,
                          setSavingPost,
                          sethasSavedPost
                        );
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
                  href={ipeDetail.destination}
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl bg-secondaryColor p-2  rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 hover:text-cyan-400 transition"
                  title="Ipe Url Destination"
                  onClick={e => e.stopPropagation()}
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
                ref={commentRef}
              />
              <button
                type="button"
                className="bg-cyan-400 text-white rounded-full px-2 py-1 font-semibold outline-none hover:bg-cyan-500 transition col-span-2 text-[13px]"
                onClick={addComment}
                ref={addCommentBtnRef}
              >
                comment
              </button>
            </div>
          </div>
          <div className="border-t-2 border-slate-200">
            {allComments?.length > 0 ? (
              allComments?.map(item => (
                <div
                  className="flex gap-3 py-5  bg-white  hover:bg-[rgba(0,0,0,0.03)]
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

                  <div className="flex flex-col flex-1">
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
                        {item.date && format(new Date(item.date), "MMMM dd")}
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

      <SimilarIpes similarIpes={similarIpes} />
    </div>
  );
}

const SimilarIpes = memo(function SimilarIpes({ similarIpes }) {
  return (
    <Suspense fallback={<Spinner message={"loading similar Ipes"} />}>
      <Await
        resolve={similarIpes}
        errorElement={
          <div className="p-5 pb-20 text-center text-slate-600 font-semibold min-w-[250px]">
            Could not load similar Ipes 😬
          </div>
        }
      >
        {resolvedSimilarIpe => {
          return (
            <div className="bg-white px-3 xl:px-4 flex-1 lg:border rounded-t-xl flex flex-col min-w-[250px] border-b-0">
              <h2 className="text-center font-bold text-xl pt-8 pb-4 ">
                More like this
              </h2>
              {resolvedSimilarIpe.length < 1 ? (
                <div className=" my-10 text-center text-slate-500 w-full font-extrabold text-lg">
                  No similar post found
                </div>
              ) : (
                <MasonryLayout
                  ipes={resolvedSimilarIpe}
                  bp={{
                    default: 4,
                    3000: 2,
                    1300: 1,
                    1023: 3,
                    1000: 2,
                    500: 1,
                  }}
                />
              )}

              <div className="hidden lg:flex flex-col flex-1 gap-12 pb-4 mt-20 ">
                <AdsBox />
                <AdsBox />
                <AdsBox />
                <AdsBox />
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
});

export default ipeDetail;
