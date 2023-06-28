import { Link } from "react-router-dom";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-6">404</h1>
        <p className="text-gray-600 mb-8">Oops! Looks like you&apos;re lost.</p>
        <p className="text-gray-600 mb-8">
          But dont worry, you can find plenty of other things on our homepage..
        </p>
        <Link
          to={"/"}
          className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
