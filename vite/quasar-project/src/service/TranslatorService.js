import {Lenguaje} from "../model/lenguaje.js";

export class TranslatorService {

  url = "https://theteacher.codiblau.com";

  async getLanguages() {
    const URI = "/public/google/translate/languages";
    const response = await fetch(this.url + URI);
    const result = await response.json();
    return result.map((idioma) => new Lenguaje(idioma.code, idioma.name));
  }
}
