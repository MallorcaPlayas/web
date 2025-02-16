import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { TranslatorService } from "src/service/TranslatorService.js";

const translatorService = new TranslatorService();
const languagesAvailable = ref([]);

export function useLanguage() {
  const fetchLanguages = async () => {
    languagesAvailable.value = (await translatorService.getAvailableLanguages()).map(lang => ({
      id: lang.id,
      nameLang: lang.name
    }));
  };

  return {
    languagesAvailable,
    fetchLanguages
  };
}
