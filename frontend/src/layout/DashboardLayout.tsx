import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { ProfileData, useAuthContext } from "../context/authcontext";
import {
    AccessTokenDecodedType,
    clearAuthTokens,
    getApiClient,
    getAuthTokens,
} from "../utils/authutils";
import DashboardSidenav from "../components/DashboardSidenav";

const DashboardLayout = () => {
    const { setProfileData } = useAuthContext();
    const data = useLoaderData() as ProfileData;

    useEffect(() => {
        // set the profile data to the newly recovered data so
        // all routes can make use of it
        setProfileData(data);
    }, [data, setProfileData]);

    return (
        <div className="flex w-screen h-screen flex-row-reverse bg-blue-50 dark:bg-[#141517]">
            <main className="flex-grow  flex flex-col xm:max-2xl:pl-14">
                <DashboardHeader />
                <div className="flex-grow">
                    <Outlet />
                </div>
            </main>
            <DashboardSidenav></DashboardSidenav>
        </div>
    );
};

export default DashboardLayout;

const dashboardLayoutLoader = async () => {
    // Get the user profile data and return it
    const tokens = getAuthTokens();
    if (!tokens) {
        return redirect("/login");
    }
    const apiClient = getApiClient();

    const { user_id } = jwtDecode<AccessTokenDecodedType>(tokens.access);

    try {
        const response = await apiClient.get(`/api/accounts/${user_id}/`);
        return response.data;
    } catch (e) {
        clearAuthTokens();
        return redirect("/login");
    }
};

export { dashboardLayoutLoader };
