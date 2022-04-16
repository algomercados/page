import { Outlet } from "react-router-dom";

import { HeaderGral } from "../sections/header/HeaderGral";

export const Layout = () => {
    return (
        <>
            <header className="App-header">
                <HeaderGral />
            </header>
            <main className="App-main">
                <Outlet />
            </main>
            <footer className="App-footer"></footer>
        </>
    );
};
