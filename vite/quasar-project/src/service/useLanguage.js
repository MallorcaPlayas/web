import {ref} from "vue";
import {useI18n} from "vue-i18n";
import {TranslatorService} from "src/service/TranslatorService.js";

const translatorService = new TranslatorService();
const languagesAvailable = ref([]);


export function useLanguage() {
    const {locale, setLocaleMessage} = useI18n();

    const getAllLanguagesAvailable = async () => {
        languagesAvailable.value = (await translatorService.getAvailableLanguages()).map(lang => ({
            id: lang.id,
            nameLang: lang.name
        }));
    };

    const changeLanguage = async (lang) => {
        locale.value = lang;
        localStorage.setItem("lang", lang);

        try {
            const translatedJson = await translatorService.fetchTranslatedJson(lang);
            if (translatedJson) {
                setLocaleMessage(lang, translatedJson);
            }
        } catch (error) {
            console.error("Error al cargar idioma:", error);
        }
    };

    return {
        languagesAvailable,
        getAllLanguagesAvailable,
        changeLanguage
    };
}
