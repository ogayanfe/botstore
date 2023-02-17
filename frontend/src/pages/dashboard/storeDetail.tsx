import { useEffect, useState } from "react";
import { useDashboardLayoutOutletData } from "../../layout/DashboardLayout";
import { getApiClient } from "../../utils/authutils";
import { Link, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { StoreType } from "./store";
import { Tabs, Tab } from "@mui/material";

const storeHeaderNavValues = [
    { label: "Insights", to: "insights" },
    { label: "Categories", to: "categories" },
    { label: "Products", to: "products" },
    { label: "Transactions", to: "transactions" },
    { label: "Settings", to: "settings" },
];

interface storeHeaderProps {
    id: number;
    name: string;
}

function StoreHeader({ name, id }: storeHeaderProps) {
    const [currentTab, setCurrentTab] = useState(0);
    const tabComponents = storeHeaderNavValues.map((s) => {
        return <Tab {...s} iconPosition="start" key={s.label + s.to} component={Link} />;
    });

    return (
        <nav className="flex flex-col lg:flex-row .g-font max-lg:gap-4 justify-between px-3 pt-4 max-w-[100rem] lg:px-8 items-center w-full">
            <h2 className="text-blue-600 dark:text-blue-300 text-2xl min-w-[10rem]">{name}</h2>
            <div className="flex-grow flex w-full justify-center lg:justify-end">
                <Tabs value={currentTab} variant="scrollable" onChange={(_, v) => setCurrentTab(v)}>
                    {tabComponents}
                </Tabs>
            </div>
        </nav>
    );
}

function DashboardStoreDetail() {
    const { setHeaderText } = useDashboardLayoutOutletData();
    const { data } = useLoaderData() as { data: StoreType };

    useEffect(() => {
        setHeaderText("Store Details");
        document.title = "Store Details | " + data.name;
    }, [setHeaderText, data.name]);
    return (
        <div className="h-full flex flex-col">
            <div className=" bg-blue-50 dark:bg-[#141517] sticky top-0 flex justify-center">
                <StoreHeader id={data.id} name={data.name} />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

function dashboardStoreDetailLoader({ params }: LoaderFunctionArgs) {
    const apiClient = getApiClient();

    return apiClient.get(`/api/store/${params.storeId}/`);
}

export default DashboardStoreDetail;
export { dashboardStoreDetailLoader };
