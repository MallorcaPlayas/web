
import { Complaint } from "src/model/Complaint.js";
import { api } from "src/boot/axios.js";

export class ComplaintService {

  #BASE_PATH = `complaints`;

  async getAll() {
    const { data } = await api.get(this.#BASE_PATH);
    return data.map(complaint => Complaint.fromJson(complaint));
  }

  create(complaint) {
    return api.post(this.#BASE_PATH, complaint);
  }

  update(complaint) {
    return api.put(`${this.#BASE_PATH}/${complaint.id}`, complaint);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
