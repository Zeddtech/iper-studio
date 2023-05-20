import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Pins from "../pages/Pins";
import PinDetail from "../pages/PinDetail";
import { CreatePin, Feed, Search } from "../components";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {
  userLoader,
  feedLoader,
  pinDetailLoader,
  userProfileLoader,
  searchLoader,
} from "../utils/routeLoader";
import NotFound from "../pages/NotFound";
import ServerDown from "../pages/ServerDown";
import EditProfile from "../pages/editProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        path="/"
        element={<Home />}
        loader={userLoader}
        id="root"
        errorElement={<ServerDown />}
      >
        <Route element={<Pins />}>
          <Route index element={<Feed />} loader={feedLoader} id="feed" />
          <Route path="search" element={<Search />} loader={searchLoader} />
          <Route
            path="category/:categoryId"
            element={<Feed />}
            loader={feedLoader}
            id="category"
          />
          <Route
            path="pin-Detail/:PinId"
            loader={pinDetailLoader}
            element={<PinDetail />}
            errorElement={<ServerDown />}
            id="pindetail"
          />

          <Route
            path="user-profile/:userid"
            element={<UserProfile />}
            loader={userProfileLoader}
          />
        </Route>
        <Route path="create-pin" element={<CreatePin />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export default router;
