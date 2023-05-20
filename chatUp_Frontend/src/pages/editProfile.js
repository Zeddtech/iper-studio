import React, { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

import { client } from "../sanityConfig";
import {
  initialState,
  createFormFields,
} from "../components/editProfileFeatures";

import { HiArrowLeft } from "react-icons/hi";

const EditProfile = () => {
  console.log("edit profile rendered ");
  const userData = useRouteLoaderData("root");
  console.log(userData);
  const [ipeFields, setIpeFields] = useState(() => initialState(userData));
  const [editingProfile, seteditingProfile] = useState(false);
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    setIpeFields({
      ...ipeFields,
      [name]: value,
    });
  };
  console.log(ipeFields);

  const editProfile = () => {
    seteditingProfile(true);
    const { birthDay, website, bio, instagramUrl, facebookUrl, location } =
      ipeFields;
    if (!initialState) {
      seteditingProfile(false);
    } else {
      console.log("edit profile ran ");

      client
        .patch(userData._id)
        .set({
          birthDay,
          bio,
          website,
          instagramUrl,
          facebookUrl,
          location,
        })
        .commit()
        .then(() => {
          seteditingProfile(false);

          navigate(`/user-profile/${userData._id}`);
        });
    }
  };
  const formFields = createFormFields(userData);
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <button
        className="rounded-full text-xl mr-auto ml-3 p-3 hover:bg-cyan-100 transition duration-300 text-gray-500"
        onClick={() => navigate(-1)}
      >
        <HiArrowLeft />
      </button>
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white md:p-6 p-3 lg:w-4/5  w-full">
        <div className="flex flex-1 flex-col gap-10 lg:pl-5 mt-10 w-full">
          {formFields.map(({ name, type, label }, i) => {
            if (name === "bio") {
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
            <div className="flex justify-between items-center mt-5">
              <button
                type="button"
                onClick={editProfile}
                className="bg-red-500 text-white font-bold p-3 rounded-full outline-none ms-auto"
                disabled={editingProfile}
              >
                {editingProfile ? "Saving  . . ." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
