import { FormControl, InputLabel, Select, MenuItem, Button, Menu } from "@mui/material";
import { Form, LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getApiClient } from "../../../utils/authutils";
import { CategoryType } from "./categories";

interface ProductType {
    id: number;
    name: string;
    category: CategoryType;
    price: number;
    weight: number;
    wait_time: string;
    is_public: boolean;
}

interface HeaderPropsType {}

function Header(props: HeaderPropsType) {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const { storeId } = useParams();

    useEffect(() => {
        const apiClient = getApiClient();
        apiClient.get(`/api/store/${storeId}/categories/`).then((response) => {
            setCategories(response.data);
        });
    }, [getApiClient]);

    return (
        <nav className="flex justify-end px-8 p-6">
            <div className="flex gap-4">
                <FormControl
                    fullWidth
                    component={Form}
                    size="small"
                    id="select-category-form"
                    sx={{ width: "112px" }}
                >
                    <InputLabel id="select-category-label">Category</InputLabel>
                    <Select
                        labelId="select-category-label"
                        id="select-category"
                        label="category"
                        name="category"
                        onChange={(e) => {
                            setCurrentCategory(e.target.value);
                        }}
                        value={currentCategory}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {categories.map((c) => {
                            return (
                                <MenuItem value={c.name} key={c.id}>
                                    {c.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Button endIcon={<AddIcon />} variant="contained" color="primary" size="small">
                    Add
                </Button>
            </div>
        </nav>
    );
}

export default function DashboardStoreProducts() {
    const { data: productsList } = useLoaderData() as { data: ProductType[] };

    return (
        <div>
            <Header />
        </div>
    );
}

function dashboardStoreProductsLoader({ params }: LoaderFunctionArgs) {
    const apiClient = getApiClient();
    return apiClient.get(`api/store/${params.storeId}/products/`);
}

export { dashboardStoreProductsLoader };
