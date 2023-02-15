import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import { ProfileData, useAuthContext } from "../context/authcontext";
import { AccessTokenDecodedType, getApiClient, getAuthTokens } from "../utils/authutils";
import DashboardSidenav from "../components/DashboardSidenav";

const DashboardLayout = () => {
    const { setProfileData } = useAuthContext();
    const data = useLoaderData() as { data: ProfileData };

    useEffect(() => {
        // set the profile data to the newly recovered data so
        // all routes can make use of it
        setProfileData(data.data);
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
export { dashboardLayoutLoader };
