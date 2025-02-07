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

  static fromJson(json){
    return new ExcursionTicketDetails(json.id,
      json.price,
      json.availableSpaces,
      json.startTime,
      json.endTime);
  }
}
