import {Complaint} from "src/model/Complaint.js";
import {Beach} from "src/model/beach/Beach.js";
import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";
import {RoleRequest} from "src/model/role/RoleRequest.js";
import {Rol} from "src/model/role/Rol.js";

export class RoleRequestService {
  #URL = "http://localhost:8080/api/user-require-role";

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    const roleRequests = await data.json()
    roleRequests.map(roleRequest => {
      return new RoleRequest(roleRequest.id,
        roleRequest.user.map(user => {
          return new User(user.id, user.name, user.userName, user.firstName, user.secondUsername, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state, null);
        }),
        roleRequest.role.map(role => {
          return new Rol(role.id, role.name)
        }),
        roleRequest.urlPhotoDni,
        roleRequest.urlOfficialDoc,
        roleRequest.approved,
      )
    })
  }

  create(roleRequest) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(roleRequest)
    });
  }

  update(roleRequest) {
    fetch(this.#URL + "/" + roleRequest.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(roleRequest)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE",
    });
  }
}
