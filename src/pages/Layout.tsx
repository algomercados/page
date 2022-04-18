import { Outlet } from "react-router-dom";

import { HeaderGral } from "../sections/header/HeaderGral";
import { Selectors } from "../sections/main/Selectors";

export const Layout = () => {
    return (
        <>
            <header className="App-header">
                <HeaderGral />
            </header>
            <main className="App-main">
                <Selectors />
                <hr />
                <Outlet />
            </main>
            <footer className="App-footer"></footer>
        </>
    );
};
