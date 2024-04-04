import { useTranslation } from "react-i18next";
import Paras from "../utils/Utils.tsx";

export default function Home() {
    const { t } = useTranslation();
    return (
        <div>
            <h2>{t("common.homePage.shortHeading")}</h2>
            <Paras></Paras>
        </div>
    );
}