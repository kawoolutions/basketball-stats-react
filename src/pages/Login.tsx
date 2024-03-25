import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Password } from "primereact/password";

export default function Login() {
    const { t } = useTranslation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <Panel header="Login" style={{ width: "400px", margin: "50px auto" }}>
                <div className="row">
                    <div className="column label">
                        {t("entity.user.name.label")}
                    </div>
                    <div className="column">
                        <InputText value={userName}
                                   onChange={(e) => setUserName(e.target.value)}
                                   placeholder={t("entity.user.name.label")}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column label">
                        {t("entity.user.password.label")}
                    </div>
                    <div className="column">
                        <Password value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  toggleMask />
                    </div>
                </div>
                <div className="row">
                    {t("common.tip.label")}: test // test ⚠
                </div>
                <div className="row">
                    <Button>{t("common.action.login.label")}</Button>
                </div>
            </Panel>
        </div>
    );
}