import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "../src/asset/global.css";
import UserProfile from "./pages/UserProfile";
import Pins from "./components/Pins";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />}>
          <Route path="user-profile/:userid" element={<UserProfile />} />
          <Route path="*" element={<Pins />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
