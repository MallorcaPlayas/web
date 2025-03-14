import { RoleRequest } from "src/model/role/RoleRequest.js";
import { api } from "src/boot/axios.js";

export class RoleRequestService {
  // Definimos la URL base para las solicitudes de rol
  #BASE_PATH = `user-require-role`;

  // Obtiene todas las solicitudes de rol y las mapea a instancias de RoleRequest
  async getAll() {
    const data = (await api.get(this.#BASE_PATH)).data;
    return data.map(roleRequest => RoleRequest.fromJson(roleRequest));
  }

  async updateRequestApproval(rol){
    const data = await api.patch(this.#BASE_PATH + "/" + rol.id,{
      approved: rol.approved
    });

    return data.status;
  }
}
