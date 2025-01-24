import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";

export class RouteService {
  #URL

  async getAll(){
    const data = await fetch(this.#URL,{
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const routes = await data.json()
    routes.map(route => {
      return new Route(route.id,route.name, route.distance, route.duration, route.elevation,
        route.distance,
        route.user.map(user => {
          return new User(user.id, user.name, user.userName, user.firstName, user.secondUsername, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state, null);
        }),
        route.private)
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
    fetch(this.#URL + "/"+ route.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(route)
    });
  }

  delete(id) {
    fetch(this.#URL + "/"+ id, {
      method: "DELETE",
    });
  }

}
