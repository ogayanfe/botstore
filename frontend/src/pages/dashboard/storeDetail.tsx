import { useEffect, useState } from "react";
import { useDashboardLayoutOutletData } from "../../layout/DashboardLayout";
import { getApiClient } from "../../utils/authutils";
import { NavLink, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { StoreType } from "./store";
import { Tabs, Tab } from "@mui/material";

const storeHeaderNavValues = [
    { label: "Insights", to: "./" },
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
    const [currentTab, setCurrentTab] = useState(() => {
        const locations = window.location.pathname.split("/");
        return !["/", ""].includes(locations.at(-1) as string) ? locations.at(-1) : "./";
    });
    const tabComponents = storeHeaderNavValues.map((s) => {
        return <Tab {...s} key={s.label + s.to} component={NavLink} value={s.to} />;
    });

    return (
        <nav className="flex flex-col lg:flex-row .g-font max-lg:gap-4 justify-between px-3 p-3 max-w-[100rem] lg:px-8 items-center w-full">
            <h2 className="text-blue-600 dark:text-blue-300 text-2xl min-w-[20rem] capitalize max-lg:text-center">
                {name}
            </h2>
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
        <div className="flex flex-col h-fit">
            <div className=" bg-gray-50 pb-2 dark:bg-[#141517] z-[1000] sticky top-0 flex justify-center">
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

    return apiClient.get(`/store/${params.storeId}/`);
}

export default DashboardStoreDetail;
export { dashboardStoreDetailLoader };
