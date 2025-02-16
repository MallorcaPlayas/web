import {Lenguaje} from "../model/Lenguaje.js";
import {api} from "boot/axios.js";


export class TranslatorService {

  url = "https://theteacher.codiblau.com";

  #urlSpring = ""

  async getLanguages() {
    const URI = "/public/google/translate/languages";
    const response = await fetch(this.url + URI);
    const result = await response.json();

    return result.map((lenguaje) => new Lenguaje(lenguaje.code, lenguaje.name));

  }

  async translatedJson(jsonData, translated, name) {
    console.log("que envio por name?", name);
    const response = await api.post("/translator/translateJsonAsText", jsonData, {
      params: {origen: "es", translated: translated, name},
      headers: {"Content-Type": "application/json"}
    });

    return response.data;
  }


  async fetchTranslatedJson(translated) {
    try {
      const response = await api.get("/translator/getTranslatedJson", {
        params: {translated}
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener las traducciones desde MongoDB:", error);
      return null;
    }
  }

  async getAvailableLanguages() {
    try {
      const response = await api.get("/translator/getAvailableLanguages");


      return response.data;
    } catch (error) {
      console.error("Error al obtener idiomas desde MongoDB:", error);
      return [];
    }
  }


  async deleteLanguage(id) {
    const response = await api.delete(`/translator/deleteLanguage/${id}`);
    return response.data;
  }

  async getLanguage(id) {
    try {
      const response = await api.get(`/translator/getLanguage/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener idioma desde MongoDB:", error);
      return null;
    }
  }

  async updateLanguage(languageData) {

    try {
      await api.put(`/translator/updateLanguage/${languageData.id}`, {
        id: languageData.id,
        nameLang: languageData.nameLang,
        translations: languageData.translations
      });
    } catch (error) {
      console.error("Error al actualizar el idioma en MongoDB:", error);
    }
  }

  async uploadJsonEs(dataToUpload) {
    try {
      const response = await api.post("/translator/uploadJson", dataToUpload, {
        headers: {"Content-Type": "application/json"}
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el idioma en MongoDB:", error);
      return null;
    }
  }


}
