import { FC } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Sidenav: FC = () => {
    return (
        <nav className="dark:bg-[#1e1f24] w-0 xm:w-14 text-blue-400">
            <button aria-label="toggle sidebar menu" className="fixed top-3 left-3 xm:left-3 ">
                <MenuIcon style={{ fontSize: "2rem" }} />
            </button>
        </nav>
    );
};

export default Sidenav;
