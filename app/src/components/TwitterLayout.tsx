import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const TwitterLayout = () => {
  return (
    <div className="min-h-screen bg-purple-200 flex px-28">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default TwitterLayout;
