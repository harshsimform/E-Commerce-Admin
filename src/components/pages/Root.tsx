import React from "react";
import { Outlet } from "react-router-dom";
import DrawerMenu from "../drawerMenu/DrawerMenu";

const Root = () => {
  return (
    <>
      <DrawerMenu />
      <Outlet />
    </>
  );
};

export default Root;
