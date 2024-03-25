import { useTranslation } from "react-i18next";
import * as packageJson from "../../../package.json";
import LocaleSwitcher from "../../i18n/LocaleSwitcher.tsx";
import { NavLink } from "react-router-dom";

export default function Header() {
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
