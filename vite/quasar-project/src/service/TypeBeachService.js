import {Beach} from "src/model/beach/Beach.js";
import {TypeBeach} from "src/model/beach/TypeBeach.js";
import {Camera} from "src/model/beach/Camera.js";
import {User} from "src/model/User.js";
import {Service} from "src/model/beach/Service.js";
import {ServiceBeach} from "src/model/beach/ServiceBeach.js";

export class TypeBeachService {
  #URL = "http://localhost:8080/api/types"
  #tokenSpring = localStorage.getItem('authToken');

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
    });

    const types = await data.json()
    return types.map(type => {
      return new TypeBeach(type.id, type.name);
    })
  }

  create(type) {

    fetch(this.#URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(type)
    });
  }

  update(type) {
    fetch(this.#URL + "/" + type.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(type)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + 1, {
      headers: {
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      method: "DELETE",
    });
  }

}
