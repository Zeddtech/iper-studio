import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components";

const Pins = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-white">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="h-full">
        <Outlet context={[searchTerm]} />
      </div>
    </div>
  );
};
export default Pins;
