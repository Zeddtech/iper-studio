import React from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import MasonryLayout from "./MansoryLayout";

function Search() {
  const pins = useLoaderData();
  const [searchTerm] = useOutletContext();
  console.log(searchTerm.get("q"));
  if (!searchTerm.get("q") || searchTerm.get("q").length < 3)
    return (
      <div className="h-[50vh] mt-10">
        <p className="text-slate-600 font-semibold text-xl p-4">
          Please enter at least 3 characters to search...
        </p>
      </div>
    );
  if (pins?.length > 0) {
    return (
      <div className="fade-in">
        <h2 className="text-slate-600 font-semibold text-xl my-5 p-4 ">
          Results for &quot;{searchTerm.get("q")}&quot;
        </h2>
        <MasonryLayout pins={pins} />
      </div>
    );
  } else {
    return (
      <div className="h-[50vh]">
        <h2 className="text-slate-600 font-semibold text-xl my-5 p-4 ">
          Results for &quot;{searchTerm.get("q")}&quot;
        </h2>
        <p className="text-slate-600 text-xl p-4">No pipe found</p>
        <p className="text-slate-600 text-base px-4">
          try searching for another pipe
        </p>
      </div>
    );
  }
}

export default Search;
