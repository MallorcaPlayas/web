import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";
import {Rol} from "src/model/role/Rol.js";
import {FunctionProj} from "src/model/role/FunctionProj.js";
import {RoleFunction} from "src/model/role/RoleFunction.js";

export class RoleService {
  #URL = `${process.env.API_SPRING_BASE_PATH}/roles`


  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    const roles = await data.json()
    return roles.map(role => {
      return new Rol(role.id, role.name, role.price, role.description,
        role.functions.map(funct => {
          return new RoleFunction(funct.id,
            new FunctionProj(funct.function.id, funct.function.name));
        })
      )
    })
  }

  create(role) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(role)
    });
  }

  update(role) {
    console.log(role)
    fetch(this.#URL + "/" + role.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(role)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE",
    });
  }
}
