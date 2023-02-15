import { AxiosError } from "axios";
import { useNavigate, useRouteError } from "react-router-dom";
import { clearAuthTokens } from "../utils/authutils";
import { useEffect } from "react";

function ErrorPage() {
    const error = useRouteError() as AxiosError | undefined;
    const navigate = useNavigate();

    useEffect(() => {
        if (error && error.response) {
            const status = error.response.status as number;
            if ([401, 403].includes(status)) {
                clearAuthTokens();
                navigate("/");
            }
        }
    }, [error, navigate]);

    return (
        <div className="w-full h-full max-h-full flex-col gap-4 errorElement flex items-center p-5 bg-blue-50 text-gray-900 justify-center dark:text-blue-500 dark:bg-[#141517]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-center">An Error Has Occurred</p>
            <span className="text-xl dark:text-gray-300">Page Not Found</span>
        </div>
    );
}

export default ErrorPage;
