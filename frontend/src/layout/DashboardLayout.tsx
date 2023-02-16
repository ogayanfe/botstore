import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, redirect, useLoaderData, useOutletContext } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { ProfileData, useAuthContext } from "../context/authcontext";
import { AccessTokenDecodedType, getApiClient, getAuthTokens } from "../utils/authutils";
import DashboardSidenav from "../components/DashboardSidenav";

interface dashboardLayoutContextType {
    headerText: string;
    setHeaderText: (t: string) => void;
}

const DashboardLayout = () => {
    const { setProfileData } = useAuthContext();
    const data = useLoaderData() as { data: ProfileData };
    const [headerText, setHeaderText] = useState("Dashboard");

    function updateHeaderText(s: string) {
        setHeaderText(s);
        document.title = s;
    }

    const outletContext: dashboardLayoutContextType = {
        headerText,
        setHeaderText: updateHeaderText,
    };
    useEffect(() => {
        // set the profile data to the newly recovered data so
        // all routes can make use of it
        setProfileData(data.data);
    }, [data, setProfileData]);
    useEffect(() => {
        document.title = "Botstore Dashboard";
    }, []);

    return (
        <div className="flex w-full h-screen flex-row-reverse bg-blue-50 dark:bg-[#141517]">
            <main className="flex-grow flex flex-col xm:max-2xl:pl-14 h-full w-full overflow-auto">
                <DashboardHeader headerText={headerText} />
                <div className="flex-grow h-full">
                    <Outlet context={outletContext} />
                </div>
            </main>
            <DashboardSidenav></DashboardSidenav>
        </div>
    );
};

function useDashboardLayoutOutletData() {
    return useOutletContext() as dashboardLayoutContextType;
}

const dashboardLayoutLoader = async () => {
    // Get the user profile data and return it
    const tokens = getAuthTokens();
    if (!tokens) {
        return redirect("/login");
    }
    const apiClient = getApiClient();

    const { user_id } = jwtDecode<AccessTokenDecodedType>(tokens.access);

    return apiClient.get(`/api/accounts/${user_id}/`);
};

export default DashboardLayout;
export { dashboardLayoutLoader, useDashboardLayoutOutletData };
