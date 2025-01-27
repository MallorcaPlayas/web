import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";

export class RouteService {
  #URL = "http://localhost:8080/api/routes"

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    const routes = await data.json()

    return routes.map(route => {
      return new Route(route.id, route.name, route.distance, route.duration, route.elevation,
        route.distance,
        new User(route.user.id, route.user.name, route.user.userName, route.user.firstName, route.user.secondUsername, route.user.email, route.user.birthday, route.user.urlPhoto, route.user.privatePrivacy, route.user.state, null),
        route.private
      )
    })
  }

  create(route) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(route)
    });
  }

  update(route) {
    fetch(this.#URL + "/" + route.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(route)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE",
    });
  }

}
