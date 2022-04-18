import { Routes, Route } from "react-router-dom";
// layouts
import { Layout } from "../pages/Layout";
import { Start } from "../pages/Start";
import { Search } from "../pages/Search";
//

// ----------------------------------------------------------------------

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Start />} />
                <Route path="search" element={<Search />} />
            </Route>
        </Routes>
    );
}
