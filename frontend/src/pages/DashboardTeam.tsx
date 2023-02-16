import { useDashboardLayoutOutletData } from "../layout/DashboardLayout";
import { useEffect } from "react";

function DashboardTeam() {
    const { setHeaderText } = useDashboardLayoutOutletData();

    useEffect(() => {
        setHeaderText("Team");
    }, [setHeaderText]);
    return <></>;
}

export default DashboardTeam;
