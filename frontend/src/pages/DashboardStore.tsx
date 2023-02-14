import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SearchFormComponent } from "../components/SearchFormComponent";

function StoreHeader() {
    return (
        <nav className="flex w-full p-2 font-semibold items-center justify-between text-gray-900 dark:text-gray-200 border-b-2 border-[#d8dee4] dark:border-[#21262d]">
            <div className="flex gap-4">
                <span className="text-xl">Stores</span>
                <Button endIcon={<AddIcon />} variant="contained" size="small">
                    New Store
                </Button>
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
