import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook, ImSkype, ImTwitter } from "react-icons/im";
import piper from "../asset/piper.mp4";
import logo from "../asset/logo.png";
import axios from "axios";
import { client } from "../sanityConfig";

function Login() {
  const [userToken, setuserToken] = useState("");

  const navigate = useNavigate();
  localStorage.setItem("user_id", 'c8e65f41-496e-4f04-b162-f1c4eb49ecad');

  useEffect(() => {
    if (userToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
              SameSite: "Strict",
            },
          }
        )
        .then(res => {
          console.log(res.data);
          const {
            id,
            email,
            family_name,
            given_name,
            picture,
            verified_email,
          } = res.data;
          client
            .createIfNotExists({
              _type: "user",
              _id: id,
              email,
              firstName: given_name,
              lastName: family_name,
              image: picture,
              verified: verified_email,
            })
            .then(res => {
              console.log(res);
              //   setUser_id(res._id);
              localStorage.setItem("user_id", res._id);

              navigate("/", { replace: true });
            });
        })
        .catch(error =>
          console.log(error.response?.data.error.message || error)
        );
    }
  }, [userToken]);

  const login = useGoogleLogin({
    onSuccess: res => setuserToken(res.access_token),
    onError: error => console.log("Login Failed:", error),
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen ">
      <div className="relative w-full h-full">
        <video
          src={piper}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="200px" alt="piper logo" />
        </div>
        <div className="social_logins shadow-2xl flex flex-col">
          <button className="social_btn google" onClick={login}>
            <FcGoogle className="icon mr-4 " />
            <span>Sign in with Google</span>
          </button>
          <button className="social_btn facebook" title="coming soon " disabled>
            <ImFacebook className="icon mr-4 " />
            <span>Sign in with facebook</span>
          </button>
          <button className="social_btn twitter" title="coming soon" disabled>
            <ImTwitter className="icon mr-4 " />
            <span>Sign in with Twitter</span>
          </button>

          <button className="social_btn skype" title="coming soon" disabled>
            <ImSkype className="icon mr-4 " />
            <span>Sign in with skype</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
