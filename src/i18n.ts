import { createI18n } from "vue-i18n";
import es from "./lang/es.json";
import en from "./lang/en.json";

const i18n = createI18n({
    fallbackLocale: "en",
    legacy: false,
    locale: localStorage.getItem("locale") || "es",
    messages: {
        en,
        es
    }
});

export default i18n;
