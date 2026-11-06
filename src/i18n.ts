import { createI18n } from "vue-i18n";
import es from "./lang/es.json";
import en from "./lang/en.json";

const locales = ["es", "en"] as const;
type Locale = (typeof locales)[number];

function getInitialLocale(): Locale {
	try {
		const stored = localStorage.getItem("locale") as Locale | null;
		return stored && locales.includes(stored) ? stored : "es";
	} catch {
		return "es";
	}
}

const i18n = createI18n({
    fallbackLocale: "en",
    legacy: false,
    locale: getInitialLocale(),
    messages: {
        en,
        es
    }
});

export default i18n;
