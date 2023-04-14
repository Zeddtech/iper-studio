import React, { useEffect, useState } from "react";
import { Link, useNavigate, useRevalidator } from "react-router-dom";
import {
  MdDownloadForOffline,
  MdOutlineDownloadForOffline,
} from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { urlFor } from "../sanityConfig";
import { useGcontex } from "../hooks/ContextProvider";
import { savePin } from "../utils/managePins";
function Pin({ pin }) {
  const { imageUrl, postedBy, destination, savedBy } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const { userData } = useGcontex();
  const [savedPost, setsavedPost] = useState();
  const navigate = useNavigate();
  const revalidate = useRevalidator();
  useEffect(() => {
    setsavedPost(
      pin?.savedBy?.map(item => item?.savedBy?._id)?.includes(userData?._id)
    );
  }, [userData]);
  console.log(pin);

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {imageUrl && (
          <img
            className="rounded-lg w-full "
            src={urlFor(imageUrl).width(250).url()}
            alt="user-post"
          />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${imageUrl}?dl=`}
                  download
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdOutlineDownloadForOffline />
                </a>
              </div>
              {savedPost ? (
                <button
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {savedBy?.length} Saved
                </button>
              ) : (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (!savedPost) {
                      setSavingPost(true);
                      savePin(pin._id, userData._id, revalidate.revalidate);
                    }
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {savedBy?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === userData?._id && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    // deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">
          {postedBy?.firstName + " " + postedBy?.lastName}
        </p>
      </Link>
    </div>
  );
}

export default Pin;
