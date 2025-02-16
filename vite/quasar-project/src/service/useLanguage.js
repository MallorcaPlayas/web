import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { TranslatorService } from "src/service/TranslatorService.js";

const translatorService = new TranslatorService();
const selectedLanguage = ref(null);
const languages = ref([]);

export function useLanguage() {
  // useI18n() debe llamarse dentro de una función que se usa en setup()
  const { locale, setLocaleMessage } = useI18n();

  const changeLanguage = async (lang) => {
    if (!lang || typeof lang !== "string") {
      console.error("Error: El idioma seleccionado no es válido.");
      return;
    }

    locale.value = lang;
    localStorage.setItem("lang", lang);

    try {
      console.log("Cambiando idioma a:", lang);
      const translatedJson = await translatorService.fetchTranslatedJson(lang);
      if (translatedJson) {
        setLocaleMessage(lang, translatedJson);
      }
    } catch (error) {
      console.error("Error al cargar idioma:", error);
    }
  };

  const getAvailableLanguages = async () => {
    try {
      const availableLanguages = await translatorService.getAvailableLanguages();
      languages.value = availableLanguages;
    } catch (error) {
      console.error("Error al obtener los idiomas desde MongoDB:", error);
    }
  };

  const saveSelectedLanguage = async (lang) => {
    if (!lang || !lang.id) {
      console.error("Error: No se ha seleccionado un idioma válido.");
      return;
    }

    selectedLanguage.value = lang.id;
    localStorage.setItem("lang", lang.id);
    await changeLanguage(lang.id);
  };

  return {
    selectedLanguage,
    languages,
    changeLanguage,
    getAvailableLanguages,
    saveSelectedLanguage
  };
}
