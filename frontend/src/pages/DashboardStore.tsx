import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SearchFormComponent } from "../components/SearchFormComponent";

function StoreHeader() {
    return (
        <nav className="flex w-full py-2 px-4 font-semibold items-center justify-between text-gray-900 dark:text-gray-200 border-b-2 border-[#d8dee4] dark:border-[#21262d]">
            <Button endIcon={<AddIcon />} variant="contained" size="small">
                New Store
            </Button>
            <SearchFormComponent />
        </nav>
    );
}

function DashboardStore() {
    return (
        <div className="p-2 pt-6 bg-inherit">
            <div className="sticky top-0 bg-blue-50 dark:bg-[#141517]">
                <StoreHeader />
            </div>
            {new Array(30).fill(<div>Hello World</div>)}
        </div>
    );
}

export default DashboardStore;
