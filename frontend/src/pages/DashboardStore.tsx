import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { SearchFormComponent } from "../components/SearchFormComponent";
import { useState, useEffect } from "react";
function StoreHeader() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timeOut: any;
        const handleResize = () => {
            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                setScreenWidth(window.innerWidth);
            }, 100);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="flex w-full py-2 px-4 font-semibold items-center justify-between text-gray-900 dark:text-gray-200 border-b-2 border-[#d8dee4] dark:border-[#21262d]">
            <div className="flex gap-1 md:gap-4 items-center">
                <span className="text-xl">Stores</span>
                {screenWidth > 500 ? (
                    <Button endIcon={<AddIcon />} variant="contained" size="small">
                        New Store
                    </Button>
                ) : (
                    <IconButton aria-label="new store" color="primary" size="large" edge="end">
                        <AddBoxIcon />
                    </IconButton>
                )}
            </div>
            <SearchFormComponent />
        </nav>
    );
}

function DashboardStore() {
    return (
        <div className="p-2">
            <StoreHeader />
        </div>
    );
}

export default DashboardStore;
