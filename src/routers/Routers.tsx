import { Routes, Route } from "react-router-dom";
// layouts
import { Layout } from "../pages/Layout";
import { Main } from "../pages/Main";
//

// ----------------------------------------------------------------------

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
            </Route>
        </Routes>
    );
}
