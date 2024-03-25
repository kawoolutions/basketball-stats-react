import { useTranslation } from "react-i18next";

export default function Competitions() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.competition.plural.heading")}</h2>
        </div>
    );
}