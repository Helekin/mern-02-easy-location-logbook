import { Outlet } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";

const App = () => {
  return (
    <>
      <div>
        <MainNavigation />
        <Outlet />
      </div>
    </>
  );
};

export default App;
