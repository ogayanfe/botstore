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
import DashboardHome from "./pages/dashboard/home";
import ThemeContextProvider from "./context/themeContext";
import DashboardTeam from "./pages/dashboard/team";
import DashboardSettings from "./pages/dashboard/settings";
import DashboardStore, { dashboardStoreLoader } from "./pages/dashboard/store";
import DashboardStoreDetail, { dashboardStoreDetailLoader } from "./pages/dashboard/storeDetail";
import ErrorPage from "./components/ErrorPage";
import DashboardStoreInsights from "./pages/dashboard/storedetails/Insights";
import DashboardStoreCategories, {
    storeCategoriesAction,
    storeCategoriesLoader,
} from "./pages/dashboard/storedetails/categories";
import DashboardStoreProducts, {
    productAction,
    dashboardStoreProductsLoader,
} from "./pages/dashboard/storedetails/products";
import DashboardStoreTransactions from "./pages/dashboard/storedetails/transactions";
import DashboardStoreSettings, {
    dashboardSettingsAction,
} from "./pages/dashboard/storedetails/settings";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route
                    path="/"
                    element={<AuthLayout />}
                    loader={() => {
                        if (getAuthTokens()) {
                            return redirect("dashboard");
                        }
                        return null;
                    }}
                >
                    <Route index element={<div>Home page</div>}></Route>
                    <Route path="login" element={<Login />} action={signInAction} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route
                    path="dashboard"
                    element={<DashboardLayout />}
                    loader={dashboardLayoutLoader}
                >
                    <Route path="" element={<DashboardHome />} />
                    <Route path="team" element={<DashboardTeam />} />
                    <Route path="settings" element={<DashboardSettings />} />
                    <Route
                        path="store"
                        element={<DashboardStore />}
                        loader={dashboardStoreLoader}
                    />
                    <Route
                        path="store/:storeId"
                        element={<DashboardStoreDetail />}
                        id="storeDetailsHome"
                        loader={dashboardStoreDetailLoader}
                    >
                        <Route path="insights" element={<DashboardStoreInsights />} />
                        <Route
                            path="categories"
                            element={<DashboardStoreCategories />}
                            loader={storeCategoriesLoader}
                            action={storeCategoriesAction}
                        />
                        <Route
                            path="products"
                            element={<DashboardStoreProducts />}
                            loader={dashboardStoreProductsLoader}
                            action={productAction}
                        />
                        <Route path="transactions" element={<DashboardStoreTransactions />} />
                        <Route
                            path="settings"
                            element={<DashboardStoreSettings />}
                            action={dashboardSettingsAction}
                        />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
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
