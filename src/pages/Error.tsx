import { useTranslation } from "react-i18next";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const { t } = useTranslation();
    const error: any = useRouteError();
    console.log("Error: ", error);
    return (
        <div>
            <h2>{t("common.error.http404.heading")}</h2>
            <p>{t("common.error.http404.message")}</p>
            <p>{t("common.error.label")}: {error.statusText || error.message}</p>
        </div>
    );
}