import { useDashboardLayoutOutletData } from "../../layout/DashboardLayout";
import { useEffect } from "react";

function DashboardSettings() {
    const { setHeaderText } = useDashboardLayoutOutletData();
    useEffect(() => {
        setHeaderText("Settings");
    }, [setHeaderText]);
    return <></>;
}

export default DashboardSettings;
