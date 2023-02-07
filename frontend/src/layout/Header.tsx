import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
    const avatarStyle = { width: "35px", height: "35px" };

    return (
        <header className="h-14 flex items-center justify-between max-xm:pl-16 px-4 dark:text-gray-200">
            <form className="bg-black  p-2 rounded-2xl flex items-center justify-center">
                <label htmlFor="header__search" className="flex items-center justify-center">
                    <span className="fixed left-[-3000000px]">Search</span>
                    <SearchIcon />
                </label>
                <input
                    type="text"
                    name="search"
                    id="header__search"
                    placeholder="search..."
                    className="hidden xm:block bg-black outline-none px-2 text-sm w-32 xm:w-48 md:w-64"
                />
            </form>
            <nav className="flex items-center justify-center gap-2">
                <button className="text-xl">
                    <NotificationsNoneIcon />
                </button>
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={avatarStyle}
                    aria-label="profile picture"
                />
                <p aria-label="username" className="text-[0px] xm:text-lg">
                    Denis
                </p>
                <button aria-label="Open additional options" aria-haspopup>
                    <KeyboardArrowDownIcon />
                </button>
            </nav>
        </header>
    );
};

export default Header;
