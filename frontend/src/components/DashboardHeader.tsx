import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import { Avatar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAuthContext } from "../context/authcontext";
import { useThemeContext } from "../context/themeContext";
import { useLocation } from "react-router-dom";

function getRouteHeaderFromPath(path: string): string {
    const pathList = path.split("/");
    const lastNode = pathList.at(-1);
    if (lastNode === undefined) {
        return "BotStore";
    }
    return lastNode === "" ? "Dashboard" : lastNode;
}

const DashboardHeader: FC = () => {
    const { profileData } = useAuthContext();
    const avatarStyle = { width: "33px", height: "33px" };
    const { darkTheme, setDarkTheme } = useThemeContext();
    const location = useLocation();
    const [headerText, setHeaderText] = useState(() => getRouteHeaderFromPath(location.pathname));

    useEffect(() => {
        setHeaderText(getRouteHeaderFromPath(location.pathname));
    }, [location]);

    return (
        <header className="h-14 flex pt-2 items-center justify-between max-xm:pl-16 px-4 dark:text-gray-200">
            <div className="italiac h-full text-2xl flex items-center justify-center font-bold text-gray-900 dark:text-gray-200 gap-2">
                <span className="relative -top-[0.2rem]">
                    <SmartToySharpIcon />
                </span>
                <h1>
                    <span className="capitalize">{headerText}</span>
                </h1>
            </div>
            <nav className="flex gap-2 md:gap-14">
                {/* <SearchForm /> */}
                <div className="flex items-center justify-center xm:gap-2 md:gap-3 gap-1">
                    <button className="text-xl">
                        <NotificationsNoneIcon />
                    </button>
                    <button onClick={() => setDarkTheme(!darkTheme)}>
                        <span className="fixed -top-[10000px]">
                            {darkTheme ? "Turn on light theme" : "Turn on dark theme"}
                        </span>
                        {darkTheme ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                    </button>
                    <Avatar
                        alt={profileData?.username.toUpperCase()}
                        src="PLACE HOLDER URL"
                        sx={avatarStyle}
                        aria-label="profile picture"
                    />
                </div>
            </nav>
        </header>
    );
};

export default DashboardHeader;
