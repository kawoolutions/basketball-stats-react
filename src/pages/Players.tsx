import { useTranslation } from "react-i18next";

export default function Players() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("entity.player.plural.heading")}</h2>
        </div>
    );
}