import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
    redirect,
} from "react-router-dom";

import DashboardLayout, { dashboardLayoutLoader } from "./layout/DashboardLayout";
import AuthContextProvider from "./context/authcontext";
import Login, { signInAction } from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import { getAuthTokens } from "./utils/authutils";
import DashboardHome from "./pages/DashboardHome";
import ThemeContextProvider from "./context/themeContext";
import DashboardTeam from "./pages/DashboardTeam";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardStore from "./pages/DashboardStore";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<DashboardLayout />} loader={dashboardLayoutLoader}>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/team/" element={<DashboardTeam />} />
                <Route path="/settings/" element={<DashboardSettings />} />
                <Route path="/store/" element={<DashboardStore />} />
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
            <ThemeContextProvider>
                <RouterProvider router={route} />
            </ThemeContextProvider>
        </AuthContextProvider>
    );
}

export default App;
