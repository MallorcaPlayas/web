export class Rol {
  id
  name
  price
  description
  functions

  constructor(id, name, price, description, functions) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.functions = functions;
  }
}
