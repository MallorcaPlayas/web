import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";

export class RouteService {
  #URL = `${process.env.API_SPRING_BASE_PATH}/routes`
  #tokenSpring = localStorage.getItem('authToken');

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.#tokenSpring
      }
    })
    const routes = await data.json()

    return routes.map(route => Route.fromJson(route));
  }

  create(route) {
    fetch(this.#URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(route)
    });
  }

  update(route) {
    fetch(this.#URL + "/" + route.id, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring
      },
      body: JSON.stringify(route)
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
