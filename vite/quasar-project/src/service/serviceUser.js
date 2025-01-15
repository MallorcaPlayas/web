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
            return new User(n.id, n.name,
                n.first_name, n.last_name,
                n.second_last_name, n.birthday,
                "inventado@gmail.com", n.urlPhoto, "activoFaltaPoner", n.state, "rolesFaltaPoner");
        })


    }
}


