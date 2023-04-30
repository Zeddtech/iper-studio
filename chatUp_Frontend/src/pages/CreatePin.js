import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import { categories } from "../utils/GROQqueries";
import { client } from "../sanityConfig";
import Spinner from "../components/Spinner";
import {
  formFields,
  initalState,
  imageFormat,
} from "../components/createpinFeatures";

import { useGcontex } from "../hooks/ContextProvider";
const CreatePin = () => {
  const [PipeData, setPipeData] = useState(initalState);
  const [loading, setLoading] = useState(false);
  const [creatingPipe, setCreatingPipe] = useState(false);
  const [fields, setFields] = useState();

  const [wrongImageType, setWrongImageType] = useState(false);
  const { userData } = useGcontex();
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setPipeData({
      ...PipeData,
      [name]: value,
    });
  };

  const uploadImage = e => {
    const pipeImage = e.target.files[0];
    // uploading asset to sanity
    if (imageFormat.includes(pipeImage.type)) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", pipeImage, {
          contentType: pipeImage.type,
          filename: userData._id + pipeImage.name,
        })
        .then(document => {
          handleChange("imageAsset", document);
          setLoading(false);
        })
        .catch(error => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const createPipe = () => {
    setCreatingPipe(true);
    const { title, about, destination, imageAsset, category } = PipeData;
    console.log(PipeData);
    if (Object.keys(PipeData).some(key => PipeData[key] === "")) {
      setCreatingPipe(false);
      setFields(true);
      const errortimeOut = setTimeout(() => {
        setFields(false);
        clearTimeout(errortimeOut);
      }, 3000);
    } else {
      console.log("create pin ran ");
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userid: userData._id,
        postedBy: {
          _type: "postedBy",
          _ref: userData._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="fixed top-0 text-red-400   p-4 rounded bg-red-100 font-semibold">
          All fields are required
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white md:p-6 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-[300px] mx-auto">
            {loading && <Spinner />}
            {wrongImageType && (
              <div className="w-full  text-center text-sm text-red-400 font-black ">
                <p>wrong image type/format.</p>
                <p>
                  Accepted image type includes .jpg .png .svg .jpeg .gif .tiff
                </p>
              </div>
            )}
            {!PipeData.imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-10 text-gray-500 text-sm font-semibold">
                    Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than
                    10MB
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
                  src={PipeData.imageAsset?.url}
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

        <div className="flex flex-1 flex-col gap-10 lg:pl-5 mt-10 w-full">
          {formFields.map(({ name, type, label }, i) => {
            if (name === "imageAsset" || name === "category") {
              return;
            }
            return (
              <div className="relative z-0" key={i + name}>
                <input
                  type={type}
                  id={name}
                  className="block outline-none text-xl pt-4 pb-2 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-cyan-400 peer"
                  placeholder=" "
                  value={PipeData[name]}
                  onChange={e => handleChange(name, e.target.value)}
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-lg font-bold mb-2 text-gray-400 duration-300 transform tracking-wide -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 capitalize"
                >
                  {label}
                </label>
              </div>
            );
          })}

          <div className="flex flex-col">
            <div>
              <select
                onChange={e => {
                  handleChange("category", e.target.value);
                }}
                className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer text-lg font-bold mb-2  capitalize"
              >
                <option value="others" className="sm:text-bg bg-white">
                  Select Category
                </option>
                {categories.map((item, i) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black "
                    value={item.name}
                    key={i + item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between items-center mt-5">
              {userData && (
                <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                  <img
                    src={userData.image}
                    className="w-10 h-10 rounded-full"
                    alt="user-profile"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-bold">{userData.firstName}</p>
                </div>
              )}
              <button
                type="button"
                onClick={createPipe}
                className="bg-red-500 text-white font-bold p-3 rounded-full outline-none ms-auto"
                disabled={creatingPipe}
              >
                {creatingPipe ? "Saving Pipe . . ." : "Save Pipe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
