import { defineBoot } from "#q-app/wrappers"; // defineBoot es útil para cualquier configuración global que necesites antes de que Vue se inicialice. ¡Ideal para configuraciones de plugins, autenticación y traducciones dinámicas
import { createI18n } from "vue-i18n";
import messages from "src/i18n";
import { TranslatorService } from "src/service/TranslatorService.js";

const translatorService = new TranslatorService();

export default defineBoot(async ({ app }) => {
  let locale = localStorage.getItem("lang") || "es";

  const i18n = createI18n({
    locale,
    globalInjection: true,
    messages
  });

  // Cargar traducciones dinámicas desde MongoDB
  try {
    // Esto te permite hacer cambios en el idioma en tiempo real cuando tienes el proyecto desplegado
    const translatedJson = await translatorService.fetchTranslatedJson(locale);
    if (translatedJson) {
      i18n.global.setLocaleMessage(locale, translatedJson);
    }
  } catch (error) {
    console.error("Error al cargar traducciones dinámicas:", error);
  }

  app.use(i18n);
});
