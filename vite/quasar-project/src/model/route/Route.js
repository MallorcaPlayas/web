export class Route{
  #id
  #name
  #distance
  #duration
  #elevation
  #user
  #visibility


  constructor(id, name, distance, duration, elevation, user, visibility) {
    this.#id = id;
    this.#name = name;
    this.#distance = distance;
    this.#duration = duration;
    this.#elevation = elevation;
    this.#user = user;
    this.#visibility = visibility;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get distance() {
    return this.#distance;
  }

  set distance(value) {
    this.#distance = value;
  }

  get duration() {
    return this.#duration;
  }

  set duration(value) {
    this.#duration = value;
  }

  get elevation() {
    return this.#elevation;
  }

  set elevation(value) {
    this.#elevation = value;
  }

  get user() {
    return this.#user;
  }

  set user(value) {
    this.#user = value;
  }

  get private() {
    return this.#private;
  }

  set private(value) {
    this.#private = value;
  }
}
