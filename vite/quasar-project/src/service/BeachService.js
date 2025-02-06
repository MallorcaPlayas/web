import {Beach} from "src/model/beach/Beach.js";
import {TypeBeach} from "src/model/beach/TypeBeach.js";
import {Camera} from "src/model/beach/Camera.js";
import {User} from "src/model/User.js";
import {Service} from "src/model/beach/Service.js";
import {ServiceBeach} from "src/model/beach/ServiceBeach.js";

export class BeachService {
  #URL = "http://localhost:8080/api/beaches"

  #tokenSpring = localStorage.getItem('authToken');

  async getAll() {
    try {

      if (!this.#tokenSpring) {
        throw new Error("El token de autorización no está disponible.");
      }

      const data = await fetch(this.#URL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.#tokenSpring
        },
      });

      if (!data.ok) {
        throw new Error(`HTTP Error en el servidor : ${data.status}`);
      }

      const beaches = await data.json()

      return beaches.map(beach => {
        return new Beach(beach.id, beach.name, beach.description,
          beach.types.map(type => {
            return new TypeBeach(type.id, type.name);
          }),
          beach.cameras.map(camera => {
            return new Camera(camera.id, camera.url);
          }),
          beach.usersInCharge.map((userInCharge) => {
            return new User(userInCharge.user.id, userInCharge.user.name, userInCharge.user.userName, userInCharge.user.firstSurname, userInCharge.user.secondSurname, userInCharge.user.email, userInCharge.user.birthday, userInCharge.user.urlPhoto, userInCharge.user.privatePrivacy, userInCharge.user.state, null
            );
          }),
          beach.services.map(service => {
            return new Service(service.id,
              new ServiceBeach(service.serviceBeach.id, service.serviceBeach.name),
              service.startTime, service.endTime);
          })
        )
      })

    } catch (error) {
      console.error("Error al obtener las playas:", error);
      return null;
      throw error
    }


  }

  create(beach) {
    fetch(this.#URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(beach)
    });
  }

  update(beach) {
    fetch(this.#URL + "/" + 1, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(beach)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      headers: {
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      method: "DELETE",
    });
  }

}
