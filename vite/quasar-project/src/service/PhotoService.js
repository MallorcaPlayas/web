import {api} from "boot/axios.js";
import {Photo} from "src/model/Photo.js";

export class PhotoService{
  #BASE_PATH = "photos"

  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    console.log(data);
    return data.map(beach => Photo.fromJson(beach))
  }

  // create(beach) {
  //   api.post(this.#BASE_PATH, beach);
  // }
  //
  // delete(id) {
  //   api.delete(`${this.#BASE_PATH}/${id}`);
  // }
}
