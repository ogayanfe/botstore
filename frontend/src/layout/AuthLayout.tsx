import { Outlet, Form, useOutletContext } from "react-router-dom";

interface AuthLayoutOutletContextType {
    inputClasses: string;
    buttonClasses: string;
    labelClasses: string;
    formHeaderClasses: string;
}

function useAuthLayoutOutletContext() {
    return useOutletContext<AuthLayoutOutletContextType>();
}

const AuthLayout = () => {
    const inputStyles = {
        inputClasses: "p-2 px-4 w-full text-sm bg-gray-900 text-white rounded-lg bg-white",
        labelClasses: "w-full pl-2",
        buttonClasses: "text-gray-200 w-max bg-blue-900 px-4 rounded-lg p-1",
    };

    return (
        <main className="w-screen h-screen text-gray-300 overflow-hidden dark:bg-[#141517] flex flex-col items-center justify-center">
            <div className="dark:bg-[#1e1f24] flex flex-col max-xxm:w-98%  max-w-md w-[90%] p-6 rounded-xl gap-7">
                <h1 className="text-center text-3xl italic">Welcome back</h1>
                <Form
                    method="post"
                    action="/login"
                    className="flex flex-col items-center text-lg justify-center gap-3"
                >
                    <Outlet context={inputStyles} />
                </Form>
            </div>
        </main>
    );
};

export default AuthLayout;
export { useAuthLayoutOutletContext };
