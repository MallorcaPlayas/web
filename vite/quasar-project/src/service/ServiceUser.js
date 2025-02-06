import {User} from '../model/User.js';
import {Rol} from '../model/role/Rol.js';
import {Organization} from "src/model/Organization.js";
import {UserRole} from "src/model/role/UserRole.js";

export class ServiceUser {
  #URL = `${process.env.API_SPRING_BASE_PATH}/users`
  async getAll() {
    const response = await fetch(this.#URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });

    const users = await response.json();

    return users.map(user => {
      return new User(user.id, user.name, user.userName, user.firstSurname, user.secondSurname, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state,
        // new Organization(
        //   user.organization.id,
        //   user.organization.name,
        //   user.organization.documentationUrl,
        //   user.organization.contactNumber
        // )
        null  ,
        user.roles.map((role) => {
          return new UserRole(
            role.id,
            new Rol(role.role.id, role.role.name),
            role.dateBegin,
            role.dateFinish
          );
        })
      );

    })


  }

  saveUser(user) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
  }

  updateUser(user) {
    fetch(this.#URL + "/" + user.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
  }

  deleteUser(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE"
    });
  }
}


