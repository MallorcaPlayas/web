import {User} from '../model/User.js';
import {Rol} from '../model/Rol.js';

export class serviceUser {
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

        const data = await response.json();


        console.log("Datos recibidos:", data);




        return data.map(n => {
          console.log(n);
            return new User(n.id,
              n.name,
                n.first_name, n.last_name,
                n.second_last_name, n.email,
              n.birthday ? new Date(n.birthday).toISOString().split('T')[0] : null,
                n.urlPhoto, n.privatePrivacy,
              n.state, n.state, "rolesFaltaPoner");
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


