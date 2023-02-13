import { FC } from "react";

const ErrorPage: FC = () => {
    return (
        <div className="w-full h-full max-h-full flex-col gap-4 errorElement flex items-center p-5 bg-blue-50 text-gray-900 justify-center dark:text-blue-500 dark:bg-[#141517]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-center">An Error Has Occurred</p>
            <span className="text-xl dark:text-gray-300">Page Not Found</span>
        </div>
    );
};

export default ErrorPage;
