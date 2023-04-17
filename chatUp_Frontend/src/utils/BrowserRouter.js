import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Pins from "../pages/Pins";
import { CreatePin, Feed, PinDetail, Search } from "../components";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { userLoader, feedLoader } from "../utils/routeLoader";
import NotFound from "../pages/NotFound";
import ServerDown from "../pages/ServerDown";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        path="/"
        element={<Home />}
        loader={userLoader}
        errorElement={<ServerDown />}
      >
        <Route element={<Pins />}>
          <Route index element={<Feed />} loader={feedLoader} />
          <Route
            path="category/:categoryId"
            element={<Feed />}
            loader={feedLoader}
          />
          <Route path="pin-Detail/:PinId" element={<PinDetail />} />
          <Route path="create-pin" element={<CreatePin />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="user-profile/:userid" element={<UserProfile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export default router;
