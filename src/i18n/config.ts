import i18n from "i18next";
// allow components to re-render when language changes
import { initReactI18next } from "react-i18next";
import deJson from './de.json'
import usJson from './us.json'

export const supportedLngs = [
    {code: "us", name: "English"},
    {code: "de", name: "Deutsch"},
];

i18n
    .use(initReactI18next)
    .init({

        resources: {
            us: { ...usJson },
            de: { ...deJson },
        },

        // Specifies the default language (locale) used
        // when a user visits our site for the first time.
        // We use English here, but feel free to use
        // whichever locale you want.
        lng: "us",

        // Fallback locale used when a translation is
        // missing in the active locale. Again, use your
        // preferred locale here.
        fallbackLng: "us",

        // Enables useful output in the browser’s
        // dev console.
        debug: true,

        // Normally, we want `escapeValue: true` as it
        // ensures that i18next escapes any code in
        // translation messages, safeguarding against
        // XSS (cross-site scripting) attacks. However,
        // React does this escaping itself, so we turn
        // it off in i18next.
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;