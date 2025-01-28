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
}
