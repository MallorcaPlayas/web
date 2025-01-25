import {User} from '../model/User.js';
import {Rol} from '../model/role/Rol.js';
import {Organization} from "src/model/Organization.js";
import {UserRole} from "src/model/role/UserRole.js";

export class ServiceUser {
  async getAllUser() {
    const url = 'http://localhost:8080/api/users';

    // crear un usuario
    // return new User(1, 'Leyenda', 'Guido', 'Figueroa', 'Castro', '12/12/1999', 'gmail@gmail.com', 'urlFotoPerfil', 'publico', 'activo', 'administrado');

    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    const url = 'http://localhost:8080/api/users';

    console.log("Usuario a guardar", user);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user) // Envía el objeto directamente

    }).then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
      .then(data => {
        console.log("Usuario guardado con éxito:", data);
      })
      .catch(error => {
        console.error("Error al guardar el usuario:", error.message);
      });
  }

  deleteUser(id) {
    const url = 'http://localhost:8080/api/users/' + id;

    fetch(url,
      {
        method: 'DELETE',
      });
  }

  // actualizar un usuario
  updateUser(user) {
    console.log("Usuario id en service: " + user.id);
    const url = 'http://localhost:8080/api/users/' + user.id;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(user) // Envía el objeto directamente

    }).then(response => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      return response.json();
    })
      .then(data => {
        console.log("Usuario actualizado con éxito:", data);
      })
      .catch(error => {
        console.error("Error al actualizar el usuario:", error.message);
      });
  }
}


