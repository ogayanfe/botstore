import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

interface SideNavElement {
    label: string;
    Icon: FC;
    target: string;
}

interface SideNavElementPropType extends SideNavElement {
    open: Boolean;
}

interface SideNavElementContainerPropType {
    elements: SideNavElement[];
    open: Boolean;
}

const _elementNames: SideNavElement[] = [
    { label: "Dashboard", target: "/", Icon: DashboardRoundedIcon },
    { label: "Teams", target: "/team", Icon: GroupWorkRoundedIcon },
    { label: "Stores", target: "/store", Icon: LocalGroceryStoreRoundedIcon },
    { label: "Settings", target: "/settings", Icon: SettingsRoundedIcon },
    { label: "Dark Mode", target: "#dark", Icon: DarkModeRoundedIcon },
];

function SideNavElement({ label, Icon, open, target }: SideNavElementPropType) {
    const navLinkClassName = `flex  overflow-hidden w-full origin-left items-center gap-6 transition-all duration-700 text-xl ${
        open ? "" : "max-xm:scale-0"
    }`;
    const activeClasses = `${navLinkClassName} ${target.at(0) === "#" ? "" : "text-blue-400"}`;

    return (
        <div className="pl-[26%] text-gray-200 hover:scale-110 transition-all">
            <NavLink
                // className={className}
                to={target}
                className={({ isActive }) => (isActive ? activeClasses : navLinkClassName)}
            >
                <span aria-hidden={true}>
                    <Icon />
                </span>
                <span
                    className={`${
                        open ? "scale-100" : "max-xl:scale-0 max-xl:text-[0px] origin-right"
                    } transition-all  duration-200`}
                >
                    {label}
                </span>
            </NavLink>
        </div>
    );
}

function SideNavElementContainer({ elements, open }: SideNavElementContainerPropType) {
    const elementsComponents = elements.map((element) => {
        return <SideNavElement {...element} open={open} />;
    });
    return <div className="mt-8 flex flex-col gap-7">{elementsComponents}</div>;
}

const Sidenav: FC = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const responsiveWidthClasses = `${showSideBar ? "w-64" : "max-xm:w-[0] xl:w-64 xm:w-14"}`;
    const sideBarLogoStore = `${showSideBar ? "scale-100" : "max-xl:scale-0"}`;

    return (
        <nav
            className={`dark:bg-[#1e1f24] fixed h-screen xl:relative left-0 text-blue-400 transition-all duration-700 ${responsiveWidthClasses} flex flex-col`}
        >
            <header className="h-14 flex items-center justify-center overflow-hidden">
                <div
                    className={`italic text-2xl flex items-center origin-left transition-all justify-center gap-4 ${sideBarLogoStore}`}
                >
                    <SmartToySharpIcon fontSize="large" />
                    <p>BotStore</p>
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
            <SideNavElementContainer
                elements={_elementNames}
                open={showSideBar}
            ></SideNavElementContainer>
        </nav>
    );
};

export default Sidenav;
