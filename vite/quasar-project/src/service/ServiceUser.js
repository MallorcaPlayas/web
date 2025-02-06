import {User} from '../model/User.js';
import {Rol} from '../model/role/Rol.js';
import {Organization} from "src/model/Organization.js";
import {UserRole} from "src/model/role/UserRole.js";

export class ServiceUser {
  #URL = "http://localhost:8080/api/users"

  #tokenSpring = localStorage.getItem('authToken');
  async getAll() {
    const url = 'http://localhost:8080/api/users';
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.#tokenSpring
        },

      });

    const users = await response.json();

    return users.map(user => {
      return new User(user.id, user.name, user.userName, user.firstSurname, user.secondSurname, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state,
        new Organization(
          user.organization.id,
          user.organization.name,
          user.organization.documentationUrl,
          user.organization.contactNumber
        ),
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
    fetch(this.#URL + "/" + user.id, {
      headers: {
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      method: "DELETE"
    });
  }
}


