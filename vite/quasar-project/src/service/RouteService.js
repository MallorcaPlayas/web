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

    console.log("Que recibo de SPingboot?", routes)

    return routes
      .filter(route => {
        // Filtrar las rutas donde route.user no existe o está mal definido
        if (!route.user) {
          console.log(`El usuario de la ruta con ID ${route.id} es null o undefined. Ruta excluida.`);
          return false; // Excluir esta ruta
        }

        if (!route.user.id) {
          console.log(`El usuario de la ruta con ID ${route.id} no tiene un ID asignado. Ruta excluida.`);
          return false; // Excluir esta ruta
        }

        return true; // Incluir esta ruta
      })
      .map(route => {
        // Aquí estamos seguros de que route.user existe y tiene un ID
        return new Route(
          route.id,
          route.name,
          route.distance,
          route.duration,
          route.elevation,
          route.locations, // TODO: Faltara mapear este Array
          new User(
            route.user.id,
            route.user.name,
            route.user.userName,
            route.user.firstSurname,
            route.user.secondSurname,
            route.user.email,
            route.user.birthday,
            route.user.urlPhoto,
            route.user.privatePrivacy,
            route.user.state,
            null
          ),
          route.private
        );
      });
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
