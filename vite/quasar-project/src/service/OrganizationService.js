import { Organization } from "src/model/Organization.js";
import { api } from "src/boot/axios.js";

export class OrganizationService {

  #BASE_PATH = `organizations`;

  async getAll() {
    console.log("HOLA!!!")
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(organization => Organization.fromJson(organization));
  }

  create(organization) {
    return api.post(this.#BASE_PATH, organization);
  }

  update(organization) {
    return api.put(`${this.#BASE_PATH}/${organization.id}`, organization);
  }

  delete(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
