import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";
import {Rol} from "src/model/role/Rol.js";
import {Function} from "src/model/role/Function.js";

export class RoleService {
  #URL = "http://localhost:8080/api/roles"


  async getAll(){
    const data = await fetch(this.#URL,{
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const roles = await data.json()
    console.log(roles)
    return roles.map(role => {
      return new Rol(role.id, role.name, role.price, role.description,
        role.functions.map(funct => {
          return new Function(funct.function.id, funct.function.name);
        }))
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
    console.log(JSON.stringify(role));
    fetch(this.#URL + "/"+ role.id, {
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
