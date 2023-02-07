import { FC, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Sidenav: FC = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const responsiveWidthClasses = `${showSideBar ? "w-56" : " w-0 xl:w-56  xm:w-14"}`;

    return (
        <nav
            className={`dark:bg-[#1e1f24] fixed h-screen xl:relative left-0 text-blue-400  transition-all duration-800 ${responsiveWidthClasses}`}
        >
            <button
                aria-label="toggle sidebar menu"
                className={` xm:absolute top-3   xm:right-3 xl:hidden duration-300 ${
                    showSideBar ? "absolute rotate-[720deg] max-xm:right-3" : "fixed max-xm:left-3"
                }`}
                onClick={() => setShowSideBar((prev) => !prev)}
            >
                <MenuIcon style={{ fontSize: "2rem" }} />
            </button>
        </nav>
    );
};

export default Sidenav;
