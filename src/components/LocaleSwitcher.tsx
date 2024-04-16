import { useTranslation } from "react-i18next";
import { supportedLngs } from "../i18n/config.ts";

import {Dropdown} from "primereact/dropdown";


export default function LocaleSwitcher() {
    const { t, i18n } = useTranslation();
    // const selectedCountryTemplate = (option: Record<string, string>, props: {placeholder: string}) => {
    //     if (option) {
    //         return (
    //             <div className="country-item country-item-value">
    //                 <img alt={option.name} src="images/flag/flag_placeholder.png" className={`flag flag-${option.code.toLowerCase()}`} />
    //                 <div>{option.name}</div>
    //             </div>
    //         );
    //     }
    //
    //     return (
    //         <span>
    //             {props.placeholder}
    //         </span>
    //     );
    // }

    const selectableCountriesTemplate = (option: Record<string, string>) => {
        const countryCode: string = option.code.substring(3).toLowerCase();
        return (
            <div className="country-item">
                <img src="/src/assets/flags/flag_placeholder.png" alt={countryCode} width="30" className={`fi fi-${countryCode.toLowerCase()}`} />
                <span style={{marginLeft: "8px"}}>{option.name}</span>
            </div>
        );
    }

//    console.log("Dropdown code: " + i18n.resolvedLanguage);
    return (
        <Dropdown value={i18n.resolvedLanguage}
                  onChange={(e) => i18n.changeLanguage(e.value)}
                  options={supportedLngs}
                  optionValue="code"
                  optionLabel="name"
                  placeholder={t("common.unknown.label")}
                  itemTemplate={selectableCountriesTemplate}
                  style={{width: "150px"}}/>
    );
}