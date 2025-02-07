import { Route } from "src/model/route/Route.js";
import { api } from "src/boot/axios.js";

export class RouteService {
  #BASE_PATH = `routes`;

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(route => Route.fromJson(route));
  }

  create(route) {
    return api.post(this.#BASE_PATH, route);
  }

  update(route) {
    return api.put(`${this.#BASE_PATH}/${route.id}`, route);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
