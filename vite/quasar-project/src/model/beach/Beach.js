export class Beach{
  _id
  _name
  _description
  _types
  _cameras
  _usersInCharge
  _services

  constructor(id, name, description, types, cameras, usersInCharge, services) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._types = types;
    this._cameras = cameras;
    this._usersInCharge = usersInCharge;
    this._services = services;
  }


  get services() {
    return this._services;
  }

  set services(value) {
    this._services = value;
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

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get types() {
    return this._types;
  }

  set types(value) {
    this._types = value;
  }

  get cameras() {
    return this._cameras;
  }

  set cameras(value) {
    this._cameras = value;
  }

  get usersInCharge() {
    return this._usersInCharge;
  }

  set usersInCharge(value) {
    this._usersInCharge = value;
  }
}
