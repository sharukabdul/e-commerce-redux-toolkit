import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarPanel from './NavbarPanel';

const RootLayout = () => {
    return (
        <div>
            <NavbarPanel />

            <main className="container">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout; 