import { useTranslation } from "react-i18next";

export default function Admin() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("common.admin.heading")}</h2>
        </div>
    );
}
