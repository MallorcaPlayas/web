import { TypeBeach } from "src/model/beach/TypeBeach.js";
import { api } from "src/boot/axios.js";

export class TypeBeachService {

  #BASE_PATH = `types`;

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(type => TypeBeach.fromJson(type));
  }

  create(type) {
    return api.post(this.#BASE_PATH, type);
  }

  update(type) {
    return api.put(`${this.#BASE_PATH}/${type.id}`, type);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
