import React from "react";
import { Outlet } from "react-router-dom";
import CustomAppBar from "../widgets/CustomAppBar";

function Layout() {
  return (
    <div>
      <CustomAppBar />
      <Outlet />
    </div>
  );
}

export default Layout;
