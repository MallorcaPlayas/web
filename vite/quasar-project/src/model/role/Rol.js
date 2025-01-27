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
  }

  get functions() {
    return this.functions;
  }

  set functions(value) {
    this.functions = value;
  }

  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get name() {
    return this.name;
  }

  set name(value) {
    this.name = value;
  }

  get price() {
    return this.price;
  }

  set price(value) {
    this.price = value;
  }

  get description() {
    return this.description;
  }

  set description(value) {
    this.description = value;
  }
}
