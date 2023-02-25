import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
    ActionFunctionArgs,
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
import { getProductGridCols } from "./utils";
import SearchIcon from "@mui/icons-material/Search";

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
}

const NoProductOverlay: React.FC = () => {
    return (
        <div className="w-full h-full text-xl flex gap-6 flex-col items-center justify-center">
            <span className="scale-[1.5]">
                <SearchIcon />
            </span>
            <h3>You not created any products</h3>
        </div>
    );
};

function ProductList() {
    const { data: productsList } = useLoaderData() as { data: ProductType[] };

    const columns = getProductGridCols(console.log);
    return (
        <div className="px-2 md:px-4 lg:px-8 pb-10 w-full max-w-[d1018px]">
            <DataGrid
                rowHeight={60}
                components={{
                    Toolbar: GridToolbar,
                    NoRowsOverlay: NoProductOverlay,
                }}
                autoHeight
                disableExtendRowFullWidth
                columns={columns}
                rows={productsList}
            />
        </div>
    );
}

function AddProduct({ open, close, categories }: AddProductProps) {
    const [formValues, setFormValues] = useState({
        name: "",
        stock_amount: "",
        is_public: true,
        price: "",
        weight: "",
        category: "",
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
        <nav className="flex gap-4 justify-between lg:px-10 p-6">
            <h3 className="text-xl dark:text-gray-200">All Products</h3>
            <Button
                endIcon={<AddIcon />}
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => {
                    setShowAddDialog((p) => !p);
                }}
            >
                Add
                <span className="fixed -left-[5000000px]">product</span>
            </Button>
            {showAddDialog && (
                <AddProduct
                    open={showAddDialog}
                    close={() => setShowAddDialog(false)}
                    categories={categories}
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

export { dashboardStoreProductsLoader };
