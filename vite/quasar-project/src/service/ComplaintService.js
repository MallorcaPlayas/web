import {Rol} from "src/model/role/Rol.js";
import {Complaint} from "src/model/Complaint.js";
import {Beach} from "src/model/beach/Beach.js";
import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";


export class ComplaintService {
  #URL = "http://localhost:8080/api/complaints";

  async getAll() {
    const data = await fetch(this.#URL, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
    const complaints = await data.json()
    complaints.map(complaint => {
      return new Complaint(complaint.id, complaint.message, complaint.status, complaint.date,
        complaint.beach.map(beach => {
          return new Beach(beach.id, beach.name, beach.description)
        }),
        complaint.route.map(route => {
          return new Route(route.id,route.name, route.distance, route.duration, route.elevation, route.distance,null, route.private)
        }),
        complaint.user.map(user => {
          return new User(user.id, user.name, user.userName, user.firstName, user.secondUsername, user.email, user.birthday, user.urlPhoto, user.privatePrivacy, user.state, null);
        })
      )
    })
  }

  create(complaint) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(complaint)
    });
  }

  update(complaint) {
    fetch(this.#URL + "/" + complaint.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(complaint)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE",
    });
  }

}
