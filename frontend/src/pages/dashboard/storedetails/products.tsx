import { FormControl, InputLabel, Select, MenuItem, Button, Chip, Avatar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    ActionFunctionArgs,
    Form,
    LoaderFunctionArgs,
    useLoaderData,
    useNavigation,
    useParams,
} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getApiClient } from "../../../utils/authutils";
import { CategoryType } from "./categories";
import ProductCreateUpdateModal from "../../../components/AddProductModal";
import { GridRenderCellParams } from "@mui/x-data-grid/models";
import styled from "@emotion/styled";
import { useThemeContext } from "../../../context/themeContext";
import { getGridCols } from "./utils";

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

interface AddProductProps {
    open: boolean;
    close: () => void;
    categories: CategoryType[];
    currentCategory: string;
}

function getDataGrid(darkTheme: boolean, width: number) {
    // I read this stack overflow article that helped to style this part
    // https://stackoverflow.com/questions/66435092/material-ui-datagrid-sticky-header

    return styled(DataGrid)(({ theme }) => {
        return {
            "& .MuiDataGrid-columnHeaders": {
                position: "sticky",
                // Replace background colour if necessary
                backgroundColor: darkTheme ? "#141517" : "#eff6ff",
                // Display header above grid data, but below any popups
                zIndex: 800,
                top: width >= 1024 ? "73px" : "121px",
                paddingTop: "10px",
                borderTop: "1px solid",
                borderColor: darkTheme ? "#515151" : "#e0e0e0",
            },
            "& .MuiDataGrid-virtualScroller": {
                // Undo the margins that were added to push the rows below the previously fixed header
                marginTop: "0 !important",
            },
            "& .MuiDataGrid-main": {
                // Not sure why it is hidden by default, but it prevented the header from sticking
                overflow: "visible",
            },
        };
    });
}

function ProductList() {
    const { data: productsList } = useLoaderData() as { data: ProductType[] };
    const { darkTheme } = useThemeContext();
    const [width, setWidth] = useState(window.innerWidth);
    const StickyDataGrid = getDataGrid(darkTheme, width);

    useEffect(() => {
        let widthTimeout: ReturnType<typeof setTimeout>;

        const setSize = () => {
            clearTimeout(widthTimeout);
            widthTimeout = setTimeout(() => {
                setWidth(window.innerWidth);
            }, 50);
        };

        window.addEventListener("resize", setSize);
        return () => {
            window.removeEventListener("resize", setSize);
        };
    }, []);

    const columns = getGridCols(console.log);
    return (
        <div className="px-2 h-full md:px-4 lg:px-8 pb-10 w-full max-w-[d1018px]">
            <StickyDataGrid
                loading={productsList.length === 0}
                rowHeight={60}
                autoHeight
                disableExtendRowFullWidth
                columns={columns}
                rows={productsList}
            />
        </div>
    );
}

function AddProduct({ open, close, categories, currentCategory }: AddProductProps) {
    const [formValues, setFormValues] = useState({
        name: "",
        stock_amount: "",
        is_public: true,
        price: "",
        weight: "",
        category: currentCategory,
        thumbnail: null,
    });

    function updateFormValues(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = event.target;
        const newValue = type === "file" ? (event.target as HTMLInputElement).files?.[0] : value;

        setFormValues((prev) => {
            return { ...prev, [name]: newValue };
        });
        console.log(name, value, type, newValue);
    }

    return (
        <ProductCreateUpdateModal
            open={open}
            formValues={formValues}
            updateFormValues={updateFormValues}
            onClose={close}
            categories={categories}
        />
    );
}

function Header(props: HeaderPropsType) {
    const [currentCategory, setCurrentCategory] = useState("All");
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const { storeId } = useParams();
    const [showAddDialog, setShowAddDialog] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const apiClient = getApiClient();
        apiClient
            .get(`/api/store/${storeId}/categories/`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch(() => alert("Couldn't load categories"));
    }, [storeId]);

    useEffect(() => {
        // hiding the dialog box whenever we are loading the page
        // need to do this so i can hide dialog whenever a form has been
        // submitted
        if (navigation.state === "loading") {
            setShowAddDialog(false);
        }
    }, [navigation]);

    return (
        <nav className="flex justify-between lg:px-8 p-6">
            <h3 className="text-xl dark:text-gray-200">Products</h3>
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
                        sx={{ minWidth: "5rem" }}
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
                <Button
                    endIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        setShowAddDialog((p) => !p);
                    }}
                >
                    Add
                </Button>
            </div>
            {showAddDialog && (
                <AddProduct
                    open={showAddDialog}
                    close={() => setShowAddDialog(false)}
                    categories={categories}
                    currentCategory={currentCategory === "All" ? "" : currentCategory}
                />
            )}
        </nav>
    );
}

export default function DashboardStoreProducts() {
    return (
        <div className="h-full">
            <Header />
            <div className="flex h-full justify-center">
                <ProductList />
            </div>
        </div>
    );
}

function dashboardStoreProductsLoader({ params }: LoaderFunctionArgs) {
    const apiClient = getApiClient();
    return apiClient.get(`api/store/${params.storeId}/products/`);
}

export { dashboardStoreProductsLoader };

export async function productAction({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const storeId = params.storeId;
    const apiClient = getApiClient();
    const catId = formData.get("category");

    const url = `/api/store/${storeId}/cat/${catId}/createproduct/`;
    try {
        await apiClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (e) {
        return e;
    }
    return null;
}
