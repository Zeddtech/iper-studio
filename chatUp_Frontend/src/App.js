import { Outlet } from "react-router-dom";

import "../src/asset/global.css";

const App = () => {
  return (
    <div className="min-w-350">
      <Outlet />
    </div>
  );
};

export default App;
