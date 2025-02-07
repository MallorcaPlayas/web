import {User} from "src/model/User.js";
import {RoleRequest} from "src/model/role/RoleRequest.js";
import {Rol} from "src/model/role/Rol.js";

export class RoleRequestService {
  #URL = "http://localhost:8080/api/user-require-role";
  #tokenSpring = localStorage.getItem('authToken');


  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {"Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.#tokenSpring}
    })
    const roleRequests = await data.json()
    return roleRequests.map(roleRequest => {
      return new RoleRequest(roleRequest.id,
        roleRequest.user.email,
        roleRequest.role.name,
        roleRequest.urlPhotoDni,
        roleRequest.urlOfficialDoc,
        roleRequest.approved
      );
    });
  }
}
