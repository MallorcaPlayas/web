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

  async translatedJson(jsonData, translated) {
    const response = await api.post("/translator/translateJsonAsText", jsonData, {
      params: { origen: "es", translated: translated },
      headers: { "Content-Type": "application/json" }
    });

    return response.data;
  }


  async fetchTranslatedJson(translated) {
    try {
      const response = await api.get("/translator/getTranslatedJson", {
        params: { translated }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener las traducciones desde MongoDB:", error);
      return null;
    }
  }
}
