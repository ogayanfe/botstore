import { FC, useState } from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";

const Sidenav: FC = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const responsiveWidthClasses = `${showSideBar ? "w-64" : " w-0 xl:w-64  xm:w-14"}`;
    const sideBarLogoStore = `${
        showSideBar ? "" : "max-xl:text-[0px] max-xl:absolute left-[-100px]"
    }`;

    return (
        <nav
            className={`dark:bg-[#1e1f24] fixed h-screen xl:relative left-0 text-blue-400  transition-all duration-800 ${responsiveWidthClasses}`}
        >
            <header className="h-14 flex items-center justify-center">
                <div
                    className={`italic text-2xl flex items-center justify-center gap-4 ${sideBarLogoStore}`}
                >
                    <SmartToySharpIcon />
                    <p>BoxStore</p>
                </div>
                <button
                    aria-label="toggle sidebar menu"
                    className={` xm:absolute top-3   xm:right-3 xl:hidden duration-300 ${
                        showSideBar
                            ? "absolute rotate-[810deg] max-xm:right-3"
                            : "fixed max-xm:left-3 -rotate-90"
                    }`}
                    onClick={() => setShowSideBar((prev) => !prev)}
                >
                    <ExpandCircleDownIcon style={{ fontSize: "2rem" }} />
                </button>
            </header>
        </nav>
    );
};

export default Sidenav;
