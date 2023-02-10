import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import { Avatar } from "@mui/material";
import { FC } from "react";
import { useAuthContext } from "../context/authcontext";

const Header: FC = () => {
    const { profileData } = useAuthContext();
    const avatarStyle = { width: "35px", height: "35px" };

    return (
        <header className="h-14 flex items-center justify-between max-xm:pl-16 px-4 dark:text-gray-200">
            <div className="italic h-full text-2xl flex items-center justify-center gap-2 xl:invisible">
                <span className="relative -top-[0.2rem]">
                    <SmartToySharpIcon />
                </span>
                <h1>
                    <span className="max-sm:absolute -left-[20000px]">BotStore</span>
                    <span className="sm:hidden" aria-hidden={true}>
                        BS
                    </span>
                </h1>
            </div>
            <nav className="flex gap-2 md:gap-14">
                <form className="bg-black  p-2 rounded-2xl sm:gap-2 flex items-center justify-center">
                    <label htmlFor="header__search" className="flex items-center justify-center">
                        <span className="fixed left-[-3000000px]">Search</span>
                        <SearchIcon />
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="header__search"
                        placeholder="Search..."
                        className="w-16 transition-all bg-black outline-none px-2 text-sm  xm:w-20 xxm:focus:w-32 md:w-48 focus:md:w-64 lg:w-64 focus:lg:w-80 xl:w-80 focus:xl:w-96"
                    />
                </form>
                <div className="flex items-center justify-center xm:gap-2 md:gap-3 gap-1">
                    <button className="text-xl">
                        <NotificationsNoneIcon />
                    </button>
                    <Avatar
                        alt={profileData?.username.toUpperCase()}
                        src="PLACE HOLDER URL"
                        sx={avatarStyle}
                        aria-label="profile picture"
                    />
                    <p aria-label="username" className="text-[0px] xm:text-md">
                        {profileData?.username}
                    </p>
                    <button aria-label="Open additional options" aria-haspopup>
                        <KeyboardArrowDownIcon />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
