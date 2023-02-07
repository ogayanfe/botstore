import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
    const avatarStyle = { width: "35px", height: "35px" };

    return (
        <header className="h-14 flex items-center justify-between max-xm:pl-16 px-4 dark:text-gray-200">
            <h1 className="italic text-xl flex items-center">
                <span className="xm:hidden">BS</span>
                <span className="max-xm:hidden">BoxStore</span>
            </h1>
            <div className="flex gap-2 md:gap-14">
                <form className="bg-black  p-2 rounded-2xl sm:gap-2 flex items-center justify-center">
                    <label htmlFor="header__search" className="flex items-center justify-center">
                        <span className="fixed left-[-3000000px]">Search</span>
                        <SearchIcon />
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="header__search"
                        placeholder="search..."
                        className="w-16 transition-all bg-black outline-none px-2 text-sm  xm:w-20 xxm:focus:w-32 md:w-48 focus:md:w-64 lg:w-64 focus:lg:w-80 xl:w-80 focus:xl:w-96"
                    />
                </form>
                <nav className="flex items-center justify-center xm:gap-2 md:gap-3 gap-1">
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
            </div>
        </header>
    );
};

export default Header;
