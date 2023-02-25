import { Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
interface CategoryType {
    id: number;
    name: string;
    created: string;
    description: string;
    thumbnail: string;
}

function CategoryHeader() {
    return (
        <nav className="text-gray-900 dark:text-gray-300 mx-2 lg:mx-8 flex items-center justify-between border-b-2 border-[#d8dee4] dark:border-[#21262d] p-3">
            <h3 className="font-semibold text-xl flex w-full items-center gap-3">
                <CategoryIcon aria-hidden />
                <span>Categories</span>
            </h3>
            <Button endIcon={<AddIcon />} variant="outlined">
                Add
                <span className="fixed -left-[5000000px]">category</span>
            </Button>
        </nav>
    );
}

export default function DashboardStoreCategories() {
    return (
        <>
            <CategoryHeader />
        </>
    );
}

export type { CategoryType };
