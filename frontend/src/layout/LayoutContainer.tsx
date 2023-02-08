import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidenav";

const LayoutContainer = () => {
    return (
        <div className="flex w-screen h-screen flex-row-reverse dark:bg-[#141517]">
            <main className="flex-grow  flex flex-col xm:max-xl:pl-14">
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
