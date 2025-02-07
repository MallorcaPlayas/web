import { FunctionProj } from "src/model/role/FunctionProj.js";
import { api } from "src/boot/axios.js";

export class FunctionService {
  #BASE_PATH = `functions`;

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(funct => FunctionProj.fromJson(funct));
  }

  create(funct) {
    return api.post(this.#BASE_PATH, funct);
  }

  update(funct) {
    return api.put(`${this.#BASE_PATH}/${funct.id}`, funct);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
