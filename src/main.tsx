import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Admin from "./pages/Admin.tsx";
import Arenas from "./pages/Arenas.tsx";
import Competitions from "./pages/Competitions.tsx";
import Error from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Players from "./pages/Players.tsx";
import Teams from "./pages/Teams.tsx";

import "./i18n/config.ts";
import "./index.css";
import PersonManager from "./pages/admin/PersonManager.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/competitions",
                element: <Competitions />
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
                path: "/login",
                element: <Login />
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        path: "/admin/personmgmt",
                        element: <PersonManager/>
                    }
                ]
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
