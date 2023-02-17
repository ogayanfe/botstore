import { useDashboardLayoutOutletData } from "../../layout/DashboardLayout";
import { useEffect } from "react";

export default function DashboardHome() {
    const { setHeaderText } = useDashboardLayoutOutletData();

    useEffect(() => {
        setHeaderText("Dashboard");
    }, [setHeaderText]);
    return <div></div>;
}
