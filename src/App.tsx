import React, { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {useTranslation} from "react-i18next";

import { Panel } from "primereact/panel";

import LocaleSwitcher from "./i18n/LocaleSwitcher.tsx";
import * as packageJson from "../package.json";

import "primereact/resources/themes/luna-blue/theme.css";
import "primeicons/primeicons.css";
import "./App.css";

export default function App() {
    return (
        <Layout>
            <Outlet></Outlet>
        </Layout>
    );
}

function Layout({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    return (
        <>
            <Header></Header>
            <nav
                style={{
                    maxWidth: "1920px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    position: "sticky",
                    top: "0",
                }}
            >
                <Panel>
                    <NavLink to="/" className="menu-link">
                        {t("common.homePage.shortLabel")}
                    </NavLink>
                    <NavLink to="/competitions" className="menu-link">
                        {t("entity.competition.plural.label")}
                    </NavLink>
                    <NavLink to="/teams" className="menu-link">
                        {t("entity.team.plural.label")}
                    </NavLink>
                    <NavLink to="/players" className="menu-link">
                        {t("entity.player.plural.label")}
                    </NavLink>
                    <NavLink to="/arenas" className="menu-link">
                        {t("entity.arena.plural.label")}
                    </NavLink>
                    <NavLink to="/admin" className="menu-link">
                        {t("common.admin.label")}
                    </NavLink>
                </Panel>
            </nav>

            <main style={{ maxWidth: "1920px", marginLeft: "auto", marginRight: "auto" }}>{children}</main>

            <Footer></Footer>
        </>
    );
}

function Header() {
    const { t } = useTranslation();
    return (
        <header className="flex-header">
            <div id="logo-title-left">
                <div className="project-title">
                    <img
                        src="http://3.79.245.148:8080/bbstats/jakarta.faces.resource/images/logo-mid-trans.png.xhtml?ln=bbstats"
                        width={132}
                        height={42}
                        style={{margin: "30px 20px 20px 20px"}}
                    />
                    <span style={{verticalAlign: "32px"}}>Basketball Stats Demo v{packageJson.version} (React + TypeScript)</span>
                </div>
            </div>
            <div id="menu-right" className="">
                <LocaleSwitcher></LocaleSwitcher>
                <NavLink to="/login" className="menu-link">
                    {t("common.login.label")}
                </NavLink>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer style={{ textAlign: "center" }}>
            <p>Copyright © 2024 Kawoolutions. All rights reserved. Developed using</p>
            <p>
                <a
                    href="https://www.typescriptlang.org"
                    title={packageJson.dependencies["typescript"].substring(1)}
                    target="_blank"
                >
                    TypeScript
                </a>
                &nbsp;|&nbsp;
                <a href="https://react.dev" title={React.version} target="_blank">
                    React
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://reactrouter.com"
                    title={packageJson.dependencies["react-router-dom"].substring(1)}
                    target="_blank"
                >
                    React Router
                </a>
                &nbsp;|&nbsp;
                <a href="https://react.dev/reference/react/hooks" target="_blank">
                    React Hooks
                </a>
                &nbsp;|&nbsp;
                <a href="https://react-redux.js.org" target="_blank">
                    React Redux
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://primereact.org"
                    title={packageJson.dependencies["primereact"].substring(1)}
                    target="_blank"
                >
                    PrimeReact
                </a>
            </p>
            <p>
                <a href="https://www.javascript.com" target="_blank">
                    JavaScript
                </a>
                &nbsp;|&nbsp;
                <a href="https://nodejs.org" title={packageJson.engines["node"].substring(1)} target="_blank">
                    Node.js
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.npmjs.com" title={React.version} target="_blank">
                    npm
                </a>
                &nbsp;|&nbsp;
                <a href="https://vitejs.dev" title={packageJson.dependencies["vite"].substring(1)} target="_blank">
                    Vite
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.jetbrains.com/webstorm" target="_blank">
                    WebStorm
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.github.com/kawoolutions/basketball-stats-react" target="_blank">
                    GitHub
                </a>
            </p>
        </footer>
    );
}