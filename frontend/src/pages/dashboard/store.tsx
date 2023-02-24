import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SearchFormComponent } from "../../components/SearchFormComponent";
import { getApiClient, getAuthTokens, UserType } from "../../utils/authutils";
import { redirect, useLoaderData, Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useDashboardLayoutOutletData } from "../../layout/DashboardLayout";
import { useEffect } from "react";

interface StoreType {
    id: number;
    name: string;
    logo: string;
    icon: string;
    moto: string;
    owner: UserType;
    accessible_users: UserType[];
    is_public: boolean;
    created: string;
    created_string: string;
}

function StoreHeader() {
    return (
        <nav className="flex w-full py-2 px-4 font-semibold items-center justify-between text-gray-900 dark:text-gray-200 border-b-2 border-[#d8dee4] dark:border-[#21262d]">
            <Button endIcon={<AddIcon />} variant="contained" color="primary" size="small">
                New Store
            </Button>
            <SearchFormComponent />
        </nav>
    );
}

function NoStoreComponent() {
    return (
        <div className="flex flex-col w-full items-center gap-6 h-4/5 justify-center text-cyan-900 dark:text-blue-200">
            <p className="text-4xl g-font text-center">You have not created any stores</p>
            <Button endIcon={<AddIcon />} variant="contained" size="large">
                Create Store
            </Button>
        </div>
    );
}

function StoreListItemComponent({ storeInfo }: { storeInfo: StoreType }) {
    return (
        <li className="flex w-full items-center p-4 gap-3 bg-inherit shadow-sm shadow-gray-500 dark:shadow-black rounded-md">
            <img src={storeInfo.logo} alt="logo" className="w-20 bg-auto"></img>
            <div className="flex flex-col relative flex-grow">
                <Link
                    className="text-blue-500 text-xl pl-1 font-semibold w-max hover:scale-[1.07] duration-150"
                    to={`./${storeInfo.id}`}
                >
                    {storeInfo.name}
                </Link>
                <p className="text-gray-900 pl-2 dark:text-blue-200 text-sm">{storeInfo.moto}</p>
                <span aria-label="created" className="absolute right-2 text-gray-500 text-sm">
                    {storeInfo.created_string}
                </span>
            </div>
        </li>
    );
}

function StoreListContainerComponent({ storeList }: { storeList: StoreType[] }) {
    const storeListItemsComponents = storeList.map((store) => (
        <StoreListItemComponent storeInfo={store} key={store.id} />
    ));
    return <ol className="py-3 px-2 grid md:grid-cols-2 gap-4">{storeListItemsComponents}</ol>;
}

function DashboardStore() {
    const { data } = useLoaderData() as AxiosResponse<StoreType[]>;
    const { setHeaderText } = useDashboardLayoutOutletData();
    useEffect(() => {
        setHeaderText("Store");
    }, [setHeaderText]);
    return (
        <div className="p-2 pt-6 bg-inherit h-full">
            <div className="sticky top-0 bg-gray-50 dark:bg-[#141517]">
                <StoreHeader />
            </div>
            {data.length === 0 ? (
                <NoStoreComponent />
            ) : (
                <StoreListContainerComponent storeList={data} />
            )}
        </div>
    );
}

function dashboardStoreLoader() {
    const tokens = getAuthTokens();
    if (!tokens) {
        return redirect("/login");
    }
    const apiClient = getApiClient();
    return apiClient.get("/api/store");
}

export default DashboardStore;
export type { StoreType };
export { dashboardStoreLoader };
