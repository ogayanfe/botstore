import { useDashboardLayoutOutletData } from "../../layout/DashboardLayout";
import { useEffect } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SearchFormComponent } from "../../components/SearchFormComponent";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getApiClient, UserType } from "../../utils/authutils";
import { AxiosResponse } from "axios";

interface TeamMember extends UserType {
    last_login: string | null;
    date_joined: string | "";
    creator: undefined;
}

function TeamHeader() {
    return (
        <nav className="flex w-full py-2 px-4 font-semibold items-center justify-between text-gray-900 dark:text-gray-200 border-b-2 border-[#d8dee4] dark:border-[#21262d]">
            <Button endIcon={<AddIcon />} variant="contained" color="primary" size="small">
                New User
            </Button>
            <SearchFormComponent />
        </nav>
    );
}

function DashboardTeam() {
    const { setHeaderText } = useDashboardLayoutOutletData();
    const { data } = useLoaderData() as AxiosResponse<TeamMember[]>;

    useEffect(() => {
        setHeaderText("Team");
    }, [setHeaderText]);
    return (
        <div className="p-2 pt-6 bg-inherit h-full">
            <div className="sticky top-0 bg-gray-50 dark:bg-[#141517]">
                <TeamHeader />
            </div>
        </div>
    );
}

export default DashboardTeam;

export async function dashboardTeamLoader(params: LoaderFunctionArgs) {
    const url = "/accounts/teams/";
    const apiClient = getApiClient();
    return apiClient.get(url);
}
