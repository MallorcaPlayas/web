import {Lenguaje} from "../model/Lenguaje.js";

export class TranslatorService {

  url = "https://theteacher.codiblau.com";

  async getLanguages() {
    const URI = "/public/google/translate/languages";
    const response = await fetch(this.url + URI);
    const result = await response.json();

    return result.map((lenguaje) => new Lenguaje(lenguaje.code, lenguaje.name));

  }
}
