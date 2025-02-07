import {User} from '../model/User.js';
import {Rol} from '../model/role/Rol.js';
import {Organization} from "src/model/Organization.js";
import {UserHasRole} from "src/model/role/UserHasRole.js";

export class UserService {
  #URL = `${process.env.API_SPRING_BASE_PATH}/users`
  #tokenSpring = localStorage.getItem('authToken');
  async getAll() {
    const response = await fetch(this.#URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

    const users = await response.json();

    return users.map(user => UserHasRole.fromJson(user));
  }

  saveUser(user) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring},
      body: JSON.stringify(user)
    });
  }

  updateUser(user) {
    fetch(this.#URL + "/" + user.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring},
      body: JSON.stringify(user)
    });
  }

  deleteUser(id) {
    fetch(this.#URL + "/" + id, {
      headers: {
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      method: "DELETE"
    });
  }
}


