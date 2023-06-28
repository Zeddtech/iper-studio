import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Spinner from "../components/Spinner";
import { imageFormat } from "./createIpeFeatures";
import { client } from "../sanityConfig";

function IpeImageUpload({ userData, handleChange, ipeFields }) {
  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);

  const uploadImage = e => {
    const ipeImage = e.target.files[0];
    // uploading asset to sanity
    if (imageFormat.includes(ipeImage.type)) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", ipeImage, {
          contentType: ipeImage.type,
          filename: userData._id + ipeImage.name,
        })
        .then(document => {
          handleChange("imageAsset", document);
          setLoading(false);
        })
        .catch(error => {});
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  return (
    <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
      <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-[300px] mx-auto">
        {loading && <Spinner />}
        {wrongImageType && (
          <div className="w-full  text-center text-sm text-red-400 font-black ">
            <p>wrong image type/format.</p>
            <p>Accepted image type includes .jpg .png .svg .jpeg .gif .tiff</p>
          </div>
        )}
        {!ipeFields.imageAsset ? (
          <label>
            <div className="flex flex-col items-center justify-center h-full cursor-pointer">
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-2xl">
                  <AiOutlineCloudUpload />
                </p>
                <p className="text-lg">Click to upload</p>
              </div>

              <p className="mt-10 text-gray-500 text-sm font-semibold">
                Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 10MB
              </p>
            </div>
            <input
              type="file"
              name="upload-image"
              onChange={uploadImage}
              className="w-0 h-0"
            />
          </label>
        ) : (
          <div className="relative h-full">
            <img
              src={ipeFields.imageAsset?.url}
              alt="uploaded-pic"
              className="h-full w-full"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              // onClick={() => setImageAsset(null)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IpeImageUpload;
