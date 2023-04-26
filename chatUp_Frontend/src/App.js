import { Outlet } from "react-router-dom";

import "../src/asset/global.css";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Outlet />
    </AnimatePresence>
  );
};

export default App;
