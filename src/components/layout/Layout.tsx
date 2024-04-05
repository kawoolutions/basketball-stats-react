import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Panel } from "primereact/panel";

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function Layout({ children }: { children: ReactNode }) {
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
                    zIndex: "9999"
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
