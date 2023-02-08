import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";

import LayoutContainer from "./layout/LayoutContainer";
import AuthContextProvider from "./context/authcontext";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import { getApiClient } from "./utils/authutils";

function Child() {
    return <h1>Hello World</h1>;
}

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={<LayoutContainer />}
                loader={() => {
                    const apiClient = getApiClient();
                    apiClient.get("https://random-d.uk/api/random/").then((d) => {
                        console.log(d);
                    });
                    return null;
                }}
            >
                <Route path="/home" element={<Child />} />
            </Route>

            <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
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
