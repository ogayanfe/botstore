import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { ProfileData, useAuthContext } from "../context/authcontext";
import {
    AccessTokenDecodedType,
    clearAuthTokens,
    getApiClient,
    getAuthTokens,
} from "../utils/authutils";
import Header from "./Header";
import Sidenav from "./Sidenav";

const LayoutContainer = () => {
    const { setProfileData } = useAuthContext();
    const data = useLoaderData() as ProfileData;

    useEffect(() => {
        // set the profile data to the newly recovered data so
        // all routes can make use of it
        setProfileData(data);
    }, [data, setProfileData]);

    return (
        <div className="flex w-screen h-screen flex-row-reverse bg-white dark:bg-[#141517]">
            <main className="flex-grow  flex flex-col xm:max-xl:pl-14">
                <Header />
                <div className="flex-grow">
                    <Outlet />
                </div>
            </main>
            <Sidenav></Sidenav>
        </div>
    );
};

export default LayoutContainer;

const layoutContainerLoader = async () => {
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

export { layoutContainerLoader };
