import {User} from "src/model/User.js";
import {ExcursionTicketDetails} from "src/model/excursion/ExcursionTicketDetails.js";
import {Route} from "src/model/route/Route.js";

export class Excursion {
  id
  description
  creationDate
  user
  excursionTicketDetails
  route

  constructor(id, description, creationDate, user, excursionTicketDetails, route) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.user = user;
    this.excursionTicketDetails = excursionTicketDetails;
    this.route = route;
  }

  static fromJson(json){
    return new Excursion(json.id,
      json.description,
      json.creationDate,
      User.fromJson(json.user),
      json.excursionTicketDetails.map(excursionDetails => ExcursionTicketDetails.fromJson(excursionDetails)),
      Route.fromJson(json.route),
    );
  }
}
