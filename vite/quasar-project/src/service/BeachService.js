import {Beach} from "src/model/beach/Beach.js";
import { api } from "src/boot/axios.js"

export class BeachService {

  #BASE_PATH = "beaches"

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    console.log("DATA: " , data);
    const beaches = data.map(beach => Beach.fromJson(beach))
    console.log(beaches);
    return beaches;
  }

  create(beach) {
    api.post(this.#BASE_PATH, beach);
  }

  update(beach) {
    api.update(`${this.#BASE_PATH}/${beach.id}`, beach);
  }

  delete(id) {
    api.delete(`${this.#BASE_PATH}/${id}`);
  }

}
