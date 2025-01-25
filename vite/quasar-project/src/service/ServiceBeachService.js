import {Beach} from "src/model/beach/Beach.js";
import {TypeBeach} from "src/model/beach/TypeBeach.js";
import {Camera} from "src/model/beach/Camera.js";
import {User} from "src/model/User.js";
import {Service} from "src/model/beach/Service.js";
import {ServiceBeach} from "src/model/beach/ServiceBeach.js";

export class ServiceBeachService {
  #URL = "http://localhost:8080/api/services"

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    });

    const services = await data.json()
    return services.map(service => {
      return new ServiceBeach(service.id, service.name);
    })
  }

  create(service) {
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
      body: JSON.stringify(service)
    });
  }

  update(service) {
    fetch(this.#URL + "/" + 1, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(service)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + 1, {
      method: "DELETE",
    });
  }

}
