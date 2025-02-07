import { Rol } from "src/model/role/Rol.js";
import { api } from "src/boot/axios.js";

export class RoleService {

  #BASE_PATH = `roles`;

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(role => Rol.fromJson(role));
  }

  create(role) {
    return api.post(this.#BASE_PATH, role);
  }

  update(role) {
    console.log(role);
    return api.put(`${this.#BASE_PATH}/${role.id}`, role);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
