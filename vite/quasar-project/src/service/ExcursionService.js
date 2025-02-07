import { User } from "src/model/User.js";
import { Excursion } from "src/model/excursion/Excursion.js";
import { ExcursionTicketDetails } from "src/model/excursion/ExcursionTicketDetails.js";
import { Route } from "src/model/route/Route.js";
import { api } from "src/boot/axios.js";

export class ExcursionService {
  #BASE_PATH = `excursions`;

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(excursion => Excursion.fromJson(excursion));
  }

  create(excursion) {
    return api.post(this.#BASE_PATH, excursion);
  }

  update(excursion) {
    return api.put(`${this.#BASE_PATH}/${excursion.id}`, excursion);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
