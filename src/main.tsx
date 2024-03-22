import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, Outlet, RouterProvider, useParams, useRouteError } from "react-router-dom";

import App from "./App.tsx";
import Paras from "./Utils.tsx";

import "./index.css";

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <Paras></Paras>
        </div>
    );
}

function Competitions() {
    return (
        <div>
            <h2>Competitions</h2>
        </div>
    );
}

function Teams() {
    return (
        <div>
            <h2>Teams</h2>
        </div>
    );
}

function Players() {
    return (
        <div>
            <h2>Players</h2>
        </div>
    );
}

function Arenas() {
    return (
        <div>
            <h2>Arenas</h2>
        </div>
    );
}

function Admin() {
    return (
        <div>
            <h2>Admin</h2>
        </div>
    );
}

function NotFound() {
    const error: any = useRouteError();
    console.log("Error: ", error)
    return (
        <div>
            <h2>Not Found</h2>
            <p>Sorry, that page doesn't exist!</p>
            <p>Error: {error.statusText || error.message}</p>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/competitions",
                element: <Competitions />,
                children: []
            },
            {
                path: "/teams",
                element: <Teams />
            },
            {
                path: "/players",
                element: <Players />
            },
            {
                path: "/arenas",
                element: <Arenas />
            },
            {
                path: "/admin",
                element: <Admin />
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
