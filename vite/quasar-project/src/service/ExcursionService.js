import {User} from "src/model/User.js";
import {Excursion} from "src/model/excursion/Excursion.js";
import {ExcursionTicketDetails} from "src/model/excursion/ExcursionTicketDetails.js";
import {Route} from "src/model/route/Route.js";

export class ExcursionService {
  #URL = `${process.env.API_SPRING_BASE_PATH}/excursions`
  #tokenSpring = localStorage.getItem('authToken');

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring},
    });

    const excursions = await data.json()


    const hola = excursions.map(excursion => {
      return new Excursion(excursion.id, excursion.description, excursion.creationDate,
        new User(excursion.user.id, excursion.user.name, excursion.user.userName, excursion.user.firstSurname, excursion.user.secondSurname, excursion.user.email, excursion.user.birthday, excursion.user.urlPhoto, excursion.user.privatePrivacy, excursion.user.state, null),
        excursion.excursionTicketDetails.map(excursionDetails => {
          return new ExcursionTicketDetails(excursionDetails.id, excursionDetails.price, excursionDetails.availableSpaces, excursionDetails.startTime, excursionDetails.endTime);
        }),
        new Route(excursion.route.id, excursion.route.name, excursion.route.distance, excursion.route.duration, excursion.route.elevation, null,
          new User(excursion.route.user.id, excursion.route.user.name, excursion.route.user.userName, excursion.route.user.firstSurname, excursion.route.user.secondSurname, excursion.route.user.email, excursion.route.user.birthday, excursion.route.user.urlPhoto, excursion.route.user.privatePrivacy, excursion.route.user.state, null)
        ),
      );
    });
    return hola;
  }

  create(excursion) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring},
      body: JSON.stringify(excursion)
    });
  }

  update(excursion) {
    fetch(this.#URL + "/" + 1, {
      method: "PUT",
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.#tokenSpring},
      body: JSON.stringify(excursion)
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
