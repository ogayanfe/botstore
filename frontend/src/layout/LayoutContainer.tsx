import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";

const LayoutContainer = () => {
    return (
        <div className="flex w-screeen h-screen flex-row-reverse">
            <main className="flex-grow dark:bg-[#141517] flex flex-col">
                <Header />
                <div className="flex-grow">
                    <Outlet />
                </div>
            </main>
            <Sidenav></Sidenav>
        </div>
    );
};

export default LayoutContainer;
