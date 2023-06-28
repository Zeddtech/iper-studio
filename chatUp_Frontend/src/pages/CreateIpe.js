import React, { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

import { categories } from "../utils/GROQqueries";
import { client } from "../sanityConfig";
import { formFields, initalState } from "../components/createIpeFeatures";
import IpeImageUpload from "../components/IpeImageUpload";

const CreateIpe = () => {
  const [ipeFields, setIpeFields] = useState(initalState);
  const [creatingIpe, setCreatingIpe] = useState(false);
  const [incompleteFields, setIncompleteFields] = useState();

  const userData = useRouteLoaderData("root");
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setIpeFields({
      ...ipeFields,
      [name]: value,
    });
  };

  const createIpe = () => {
    setCreatingIpe(true);
    const { title, about, destination, imageAsset, category } = ipeFields;

    if (Object.keys(ipeFields).some(key => ipeFields[key] === "")) {
      setCreatingIpe(false);
      setIncompleteFields(true);
      const errortimeOut = setTimeout(() => {
        setIncompleteFields(false);
        clearTimeout(errortimeOut);
      }, 3000);
    } else {
      const doc = {
        _type: "ipe",
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
      {incompleteFields && (
        <p className="fixed top-0 text-red-400   p-4 rounded bg-red-100 font-semibold">
          All fields are required
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white md:p-6 p-3   w-full">
        <IpeImageUpload
          userData={userData}
          handleChange={handleChange}
          ipeFields={ipeFields}
        />

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
                  value={ipeFields[name]}
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
                className="outline-none w-full  border-b-2 border-gray-200 p-2 rounded-md cursor-pointer text-lg font-bold mb-2  capitalize"
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
                onClick={createIpe}
                className="bg-red-500 text-white font-bold p-3 rounded-full outline-none ms-auto"
                disabled={creatingIpe}
              >
                {creatingIpe ? "Saving Ipe . . ." : "Save Ipe"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateIpe;
