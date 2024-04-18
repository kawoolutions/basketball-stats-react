import i18n from "../i18n/config";

import "../assets/flags/flag-icons.css";

export function CountryFlag(countryCode: string) {
    if (!countryCode) {
        return null;
    }

    const underscoredLocale = i18n.resolvedLanguage;
    const language = underscoredLocale!.substring(0, 2);
    const regionNames = new Intl.DisplayNames([language], {type: 'region'});
    const countryName = regionNames.of(countryCode);

    return (
        <div>
            <img src="/src/assets/flags/flag_placeholder.png" alt={countryCode} width="30" className={`fi fi-${countryCode.toLowerCase()}`} />
            <span>{countryName} ({countryCode})</span>
        </div>
    );
}

export function Paras() {
    return Array.from(
        { length: 40 },
        (_, i) => (
            <p key={i}>
                Paragraph {i}
            </p>
        )
    );
}