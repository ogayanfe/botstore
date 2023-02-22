import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import {
    ActionFunctionArgs,
    Form,
    LoaderFunctionArgs,
    useLoaderData,
    useNavigation,
    useParams,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getApiClient } from "../../../utils/authutils";
import { CategoryType } from "./categories";
import ProductCreateUpdateModal from "../../../components/AddProductModal";

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

function NoProducts() {
    return (
        <div>
            <p>Nothing to show here</p>
        </div>
    );
}

interface AddProductProps {
    open: boolean;
    close: () => void;
    categories: CategoryType[];
    currentCategory: string;
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
