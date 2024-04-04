import { useTranslation } from "react-i18next";
import {NavLink} from "react-router-dom";

export default function Admin() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("common.admin.heading")}</h2>
            <NavLink to="/admin/personmgmt" className="">
                {t("entity.player.plural.label")}, {t("entity.coach.plural.label")} &amp; {t("entity.referee.plural.label")}
            </NavLink>
        </div>
    );
}
