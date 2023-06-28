import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
// import { UserContextProvider } from "./hooks/ContextProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SpinnerOfDoom from "./components/SpinnerOfDoom";
import router from "./utils/BrowserRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {/* <UserContextProvider> */}
      <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />} />
      {/* </UserContextProvider> */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);
