import { useTranslation } from "react-i18next";

export default function Arenas() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.arena.plural.heading")}</h2>
        </div>
    );
}