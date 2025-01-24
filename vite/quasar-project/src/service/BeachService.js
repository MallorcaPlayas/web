import {Beach} from "src/model/beach/Beach.js";
import {TypeBeach} from "src/model/beach/TypeBeach.js";
import {Camera} from "src/model/beach/Camera.js";
import {User} from "src/model/User.js";

export class BeachService {
  #URL = "http://localhost:8080/api/beaches"

  async getAll() {
    const data = await fetch(this.#URL,{
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    });

    const beaches = await data.json()

    return beaches.map(beach => {
      return new Beach(beach.id, beach.name, beach.description,
        beach.types.map(type => {
          return new TypeBeach(type.id, type.name);
        }),
        beach.cameras.map(camera => {
          return new Camera(camera.id, camera.url);
        }),
        beach.usersInCharge.map(user => {
          return new User(user.id, user.name, user.userName, user.firstName, user.secondUsername, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state, null);
        }));
    })
  }
  async create(beach) {
    console.log('Creando playa:', beach);
  }
  async update(beach) {
    console.log('Actualizando playa:', beach);
  }
  async delete(id) {
    console.log('Eliminando playa con ID:', id);
  }

}
