export class ExcursionTicketDetails {
  id
  price
  availableSpaces
  startTime
  endTime


  constructor(id, price, availableSpaces, startTime, endTime) {
    this.id = id;
    this.price = price;
    this.availableSpaces = availableSpaces;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
