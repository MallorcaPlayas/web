import { ServiceBeach } from "src/model/beach/ServiceBeach.js";
import { api } from "src/boot/axios.js";

export class ServiceBeachService {
  #BASE_PATH = `services`;

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(service => ServiceBeach.fromJson(service));
  }

  create(service) {
    return api.post(this.#BASE_PATH, service);
  }

  update(service) {
    return api.put(`${this.#BASE_PATH}/${service.id}`, service);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
