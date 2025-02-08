import { User } from "src/model/User.js";
import { api } from "src/boot/axios.js";

export class UserService {
  #BASE_PATH = "users";

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(user => User.fromJson(user));
  }

  saveUser(user) {
    return api.post(this.#BASE_PATH, user);
  }

  updateUser(user) {
    return api.put(`${this.#BASE_PATH}/${user.id}`, user);
  }

  deleteUser(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
