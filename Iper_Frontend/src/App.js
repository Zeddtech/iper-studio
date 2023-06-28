import { Outlet } from "react-router-dom";

import "../src/asset/global.css";

const App = () => {
  return (
    <div className="min-w-[300px]">
      <Outlet />
    </div>
  );
};

export default App;
