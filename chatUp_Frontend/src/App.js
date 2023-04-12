import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "../src/asset/global.css";
import UserProfile from "./pages/UserProfile";
import Pins from "./pages/Pins";
import { CreatePin, Feed, PinDetail, Search } from "./components";
import userLoader from "./utils/routeLoader";
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
          loader={async () => {
            return 23;
          }}
        >
          <Route element={<Pins />}>
            <Route index element={<Feed />} />
            <Route path="category/:categoryId" element={<Feed />} />
            <Route path="pin-Detail/:PinId" element={<PinDetail />} />
            <Route path="createPin" element={<CreatePin />} />
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="user-profile/:userid" element={<UserProfile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
