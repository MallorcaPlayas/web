export class Rol {
  _id
  _name
  _price
  _description
  _functions


  constructor(id, name, price, description, functions) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._description = description;
  }

  get functions() {
    return this._functions;
  }

  set functions(value) {
    this._functions = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get price() {
    return this._price;
  }

  set price(value) {
    this._price = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
}
