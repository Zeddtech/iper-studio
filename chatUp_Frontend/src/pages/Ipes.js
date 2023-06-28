import { Outlet, useSearchParams } from "react-router-dom";

import { Navbar } from "../components";

const Ipes = () => {
  console.log("Ipes rendered ");
  const [searchTerm, setSearchTerm] = useSearchParams();

  return (
    <div className="px-2 md:px-5">
      <div className="bg-white">
        <Navbar setSearchTerm={setSearchTerm} />
      </div>
      <div className="h-full">
        <Outlet context={[searchTerm]} />
      </div>
    </div>
  );
};
export default Ipes;
