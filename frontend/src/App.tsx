import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
    redirect,
} from "react-router-dom";

import LayoutContainer, { layoutContainerLoader } from "./layout/LayoutContainer";
import AuthContextProvider from "./context/authcontext";
import Login, { signInAction } from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import { getAuthTokens } from "./utils/authutils";

function Child() {
    return <h1>Hello World</h1>;
}

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<LayoutContainer />} loader={layoutContainerLoader}>
                <Route path="/home" element={<Child />} />
            </Route>

            <Route
                path="/"
                element={<AuthLayout />}
                loader={() => {
                    if (getAuthTokens()) {
                        return redirect("/");
                    }
                    return null;
                }}
            >
                <Route path="/login" element={<Login />} action={signInAction} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Route>
    )
);

function App() {
    return (
        <AuthContextProvider>
            <RouterProvider router={route} />
        </AuthContextProvider>
    );
}

export default App;
