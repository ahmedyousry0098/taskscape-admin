import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout() {
  return (
    <>
      <div className="overflow-y-scroll h-screen">
        <div className="">
          <Sidebar />
        </div>

        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}
