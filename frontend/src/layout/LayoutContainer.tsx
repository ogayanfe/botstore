import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { ProfileData, useAuthContext } from "../context/authcontext";
import { AccessTokenDecodedType, getApiClient, getAuthTokens } from "../utils/authutils";
import Header from "./Header";
import Sidenav from "./Sidenav";

const LayoutContainer = () => {
    const { setProfileData } = useAuthContext();
    const data = useLoaderData() as ProfileData;

    useEffect(() => {
        setProfileData(data);
    }, [data]);

    return (
        <div className="flex w-screen h-screen flex-row-reverse dark:bg-[#141517]">
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
    const tokens = getAuthTokens();
    if (!tokens) {
        return redirect("/login");
    }
    const apiClient = getApiClient();

    const { user_id } = jwtDecode<AccessTokenDecodedType>(tokens.access);
    const response = await apiClient.get(`/api/accounts/${user_id}/`);
    return response.data;
};

export { layoutContainerLoader };
