import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    RouterProvider,
} from "react-router-dom";
import LayoutContainer from "./layout/LayoutContainer";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<LayoutContainer />}>
            <Route path="/home" element={<h1>Home</h1>} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={route} />;
}

export default App;
