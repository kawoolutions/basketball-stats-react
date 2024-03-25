import { useTranslation } from "react-i18next";

export default function Teams() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.team.plural.heading")}</h2>
        </div>
    );
}