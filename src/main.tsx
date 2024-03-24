import { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";

import App from "./App.tsx";
import Paras from "./Utils.tsx";

import "./i18n/config.ts";

import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

import "./index.css";
import {useTranslation} from "react-i18next";

function Home() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("common.homePage.shortLabel")}</h2>
            <Paras></Paras>
        </div>
    );
}

function Competitions() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.competition.plural.heading")}</h2>
        </div>
    );
}

function Teams() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.team.plural.heading")}</h2>
        </div>
    );
}

function Players() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.player.plural.heading")}</h2>
        </div>
    );
}

function Arenas() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.arena.plural.heading")}</h2>
        </div>
    );
}

function Admin() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("common.admin.heading")}</h2>
        </div>
    );
}

function Login() {
    const { t } = useTranslation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <Panel header="Login" style={{ width: "400px", margin: "50px auto" }}>
                <div className="row">
                    <div className="column label">
                        {t("entity.user.name.label")}
                    </div>
                    <div className="column">
                        <InputText value={userName}
                                   onChange={(e) => setUserName(e.target.value)}
                                   placeholder={t("entity.user.name.label")}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column label">
                        {t("entity.user.password.label")}
                    </div>
                    <div className="column">
                        <Password value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  toggleMask />
                    </div>
                </div>
                <div className="row">
                    {t("common.tip.label")}: test // test ⚠
                </div>
                <div className="row">
                    <Button>{t("common.action.login.label")}</Button>
                </div>
            </Panel>
        </div>
    );
}

function NotFound() {
    const { t } = useTranslation();
    const error: any = useRouteError();
    console.log("Error: ", error);
    return (
        <div>
            <h2>{t("common.error.http404.heading")}</h2>
            <p>{t("common.error.http404.message")}</p>
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
