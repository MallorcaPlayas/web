import {Beach} from "src/model/beach/Beach.js";
import {TypeBeach} from "src/model/beach/TypeBeach.js";
import {Camera} from "src/model/beach/Camera.js";
import {User} from "src/model/User.js";
import {Service} from "src/model/beach/Service.js";
import {ServiceBeach} from "src/model/beach/ServiceBeach.js";
import {Excursion} from "src/model/excursion/Excursion.js";
import {ExcursionTicketDetails} from "src/model/excursion/ExcursionTicketDetails.js";
import {Route} from "src/model/route/Route.js";

export class ExcursionService {
  #URL = "http://localhost:8080/api/excursions"

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    });

    const excursions = await data.json()
    return excursions.map(excursion => {
      return new Excursion(excursion.id, excursion.description, excursion.creationDate,
        excursion.user.map((user) => {
          return new User(user.id, user.name, user.userName, user.firstSurname, user.secondSurname, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state, null);
        }),
        excursion.excursionTicketDetails.map(excursionDetails => {
          return new ExcursionTicketDetails(excursionDetails.id, excursionDetails.price,excursionDetails.availableSpaces, excursionDetails.startTime,excursionDetails.endTime);
        }),
        excursion.route.map(route => {
          return new Route(route.id, route.name, route.distance, route.duration, route.elevation, null,
          new User(route.user.id, route.user.name, route.user.userName, route.user.firstSurname, route.user.secondSurname, route.user.email, route.user.birthday, route.user.urlPhoto, route.user.privatePrivacy, route.user.state, null));
        }),
        excursion.private
      )
    })
  }

  create(beach) {
    console.log("Tipo de dato BEACHE SERVICE", typeof beach)
    console.log("Alex la info de la playa llega directamente al beachService", beach)
    // EJEMPLO!!!
    // Se tendria que cambiar para que el metodo reciba un objeto playa
    const playa = {
      "id": "1",
      "name": "Sunny Beach",
      "description": "A beautiful sandy beach with clear water.",
      "types": [
        {
          "id": 14,
          "name": "Urban"
        },
        {
          "id": 15,
          "name": "Secluded"
        },
        {
          "id": 16,
          "name": "Playa tranquila"
        }
      ],
      // "cameras": [
      //   {
      //     "id": 8,
      //     "url": "http://example.com/camera8.jpg",
      //   },
      //   {
      //     "id": 9,
      //     "url": "http://example.com/camera9.jpg",
      //   },
      //   {
      //     "id": 10,
      //     "url": "http://example.com/camera10.jpg",
      //   },
      // ],
      // "usersInCharge": [
      //   {
      //     "id": 8,
      //     "name": "Lucy",
      //     "userName": "lucydavis",
      //     "firstSurname": "Davis",
      //     "secondSurname": "King",
      //     "email": "lucy.davis@example.com",
      //     "birthday": "1989-08-14T06:00:00.000+00:00",
      //     "urlPhoto": "url_photo_8.jpg",
      //     "privatePrivacy": false,
      //     "state": true,
      //     "organization": {
      //       "id": 2,
      //       "name": "Organization 2",
      //       "documentationUrl": "http://docs.org2.com",
      //       "contactNumber": "987654321"
      //     }
      //   },
      //   {
      //     "id": 9,
      //     "name": "Jack",
      //     "userName": "jackmartin",
      //     "firstSurname": "Martin",
      //     "secondSurname": "Scott",
      //     "email": "jack.martin@example.com",
      //     "birthday": "1993-04-06T06:00:00.000+00:00",
      //     "urlPhoto": "url_photo_9.jpg",
      //     "privatePrivacy": true,
      //     "state": false,
      //     "organization": {
      //       "id": 3,
      //       "name": "Organization 3",
      //       "documentationUrl": "http://docs.org3.com",
      //       "contactNumber": "555123456"
      //     }
      //   },
      //   {
      //     "id": 10,
      //     "name": "Sophia",
      //     "userName": "sophiajones",
      //     "firstSurname": "Jones",
      //     "secondSurname": "Miller",
      //     "email": "sophia.jones@example.com",
      //     "birthday": "1994-01-18T07:00:00.000+00:00",
      //     "urlPhoto": "url_photo_10.jpg",
      //     "privatePrivacy": false,
      //     "state": true,
      //     "organization": {
      //       "id": 1,
      //       "name": "Organization 1",
      //       "documentationUrl": "http://docs.org1.com",
      //       "contactNumber": "123456789"
      //     }
      //   },
      // ]
    }

    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(beach)
    });
  }

  update(beach) {
    console.log(JSON.stringify(beach))

    fetch(this.#URL + "/" + 1, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(beach)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE",
    });
  }
}
