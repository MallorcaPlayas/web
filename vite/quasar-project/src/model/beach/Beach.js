export class Beach{
  id
  name
  description
  types
  cameras
  usersInCharge
  services

  constructor(id, name, description, types, cameras, usersInCharge, services) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.types = types;
    this.cameras = cameras;
    this.usersInCharge = usersInCharge;
    this.services = services;
  }


  get services() {
    return this.services;
  }

  set services(value) {
    this.services = value;
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

  get description() {
    return this.description;
  }

  set description(value) {
    this.description = value;
  }

  get types() {
    return this.types;
  }

  set types(value) {
    this.types = value;
  }

  get cameras() {
    return this.cameras;
  }

  set cameras(value) {
    this.cameras = value;
  }

  get usersInCharge() {
    return this.usersInCharge;
  }

  set usersInCharge(value) {
    this.usersInCharge = value;
  }
}
