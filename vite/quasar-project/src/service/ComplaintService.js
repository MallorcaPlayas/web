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
    return complaints.map(complaint => {
      return new Complaint(complaint.id, complaint.message, complaint.status, complaint.date,
        new Beach(complaint.beach.id, complaint.beach.name, complaint.beach.description),
        new Route(complaint.route.id, complaint.route.name, complaint.route.distance, complaint.route.duration, complaint.route.elevation, null),
        new User(complaint.user.id, complaint.user.name, complaint.user.userName, complaint.user.firstSurname, complaint.user.secondSurname, complaint.user.email, complaint.user.birthday, complaint.user.urlPhoto, complaint.user.privatePrivacy, complaint.user.state, null)
      );
    });
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
