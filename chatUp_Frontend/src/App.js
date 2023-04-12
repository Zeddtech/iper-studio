import { Outlet } from "react-router-dom";

import "../src/asset/global.css";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
