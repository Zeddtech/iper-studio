import React from "react";

function Footer() {
  return (
    <footer className=" bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3>Get the App</h3>
          <div className="flex justify-center my-3">
            <div className="flex items-center border  rounded-lg px-4 py-2 w-52 mx-2 border-cyan-400">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs md:text-sm"> Google Play Store </p>
              </div>
            </div>
            <div className="flex items-center border  rounded-lg px-4 py-2 w-44 mx-2 border-cyan-400">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs md:text-sm"> Apple Store </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col lg:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            © 2021 SomeCompany, Inc. All rights reserved.
          </p>
          <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l border-cyan-400">Contact us</span>
            <span className="px-2 border-l border-cyan-400">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
