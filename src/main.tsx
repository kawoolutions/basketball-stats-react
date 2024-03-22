import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, Outlet, RouterProvider, useParams, useRouteError } from "react-router-dom";

import App from "./App.tsx";
import Paras from "./Utils.tsx";

import "./index.css";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

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

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <Panel header="Login" style={{ width: "400px", margin: "50px auto" }}>
                <div className="row">
                    <div className="column label">
                        User name:
                    </div>
                    <div className="column">
                        <InputText value={userName}
                                   onChange={(e) => setUserName(e.target.value)}
                                   placeholder="Enter user name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="column label">
                        Password:
                    </div>
                    <div className="column">
                        <Password value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  toggleMask />
                    </div>
                </div>
                <div className="row">
                    Hint: test // test ⚠
                </div>
                <div className="row">
                    <Button>Anmelden</Button>
                </div>
            </Panel>
        </div>
    );
}

function NotFound() {
    const error: any = useRouteError();
    console.log("Error: ", error);
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
                path: "/login",
                element: <Login />
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
