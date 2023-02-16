import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalGroceryStoreRoundedIcon from "@mui/icons-material/LocalGroceryStoreRounded";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

interface DashboardSideNavElement {
    label: string;
    Icon: FC;
    target: string;
}

interface DashboardSideNavElementPropType extends DashboardSideNavElement {
    open: Boolean;
}

interface DashboardSideNavElementContainerPropType {
    elements: DashboardSideNavElement[];
    open: Boolean;
}

const _elementNames: DashboardSideNavElement[] = [
    { label: "Dashboard", target: "./", Icon: DashboardRoundedIcon },
    { label: "Team", target: "team", Icon: GroupWorkRoundedIcon },
    { label: "Stores", target: "store", Icon: LocalGroceryStoreRoundedIcon },
    { label: "Settings", target: "settings", Icon: SettingsRoundedIcon },
];

function SideNavElementComponent({ label, Icon, open, target }: DashboardSideNavElementPropType) {
    const navLinkClassName = `flex  overflow-hidden w-full origin-left items-center gap-6 transition-all duration-700 text-xl ${
        open ? "" : "max-xm:scale-0"
    }`;
    const activeClasses = `${navLinkClassName} text-blue-500`;

    return (
        <div className="pl-[26%] text-gray-100 dark:text-gray-200 hover:scale-110 transition-all">
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
                        open ? "scale-100" : "max-2xl:scale-0 max-2xl:text-[0px] origin-right"
                    } transition-all  duration-200`}
                >
                    {label}
                </span>
            </NavLink>
        </div>
    );
}

function SideNavElementContainer({ elements, open }: DashboardSideNavElementContainerPropType) {
    const elementsComponents = elements.map((element) => {
        return <SideNavElementComponent {...element} open={open} key={Date() + element.label} />;
    });
    return <div className="mt-8 flex flex-col gap-7">{elementsComponents}</div>;
}

const DashboardSidenav: FC = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const responsiveWidthClasses = `${showSideBar ? "w-64" : "max-xm:w-[0] 2xl:w-64 xm:w-14"}`;
    const sideBarLogoStore = `${showSideBar ? "scale-100" : "max-2xl:scale-0"}`;

    return (
        <nav
            className={`bg-gray-900 dark:bg-[#1e1f24] fixed h-screen 2xl:relative left-0 text-blue-400 transition-all duration-700 ${responsiveWidthClasses} flex flex-col`}
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
                    className={` xm:absolute top-3 xm:right-3 2xl:hidden duration-300 ${
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

export default DashboardSidenav;
