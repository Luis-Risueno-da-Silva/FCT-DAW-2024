import React from "react";
import { Outlet } from "react-router-dom";

// Importar el menú
import Menu from "./Menu";

const Layout = () => {

    return(
        <div>

            {/* Navbar */}
            <header>
                <Menu />
            </header>

            {/* Outlet */}
            <main>
                <Outlet />
            </main>

        </div>
    )

}

// Exportar el Layout
export default Layout;