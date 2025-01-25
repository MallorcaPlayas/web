export class Route{
  _id
  _name
  _distance
  _duration
  _elevation
  _user
  _visibility


  constructor(id, name, distance, duration, elevation, user, visibility) {
    this._id = id;
    this._name = name;
    this._distance = distance;
    this._duration = duration;
    this._elevation = elevation;
    this._user = user;
    this._visibility = visibility;
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

  get distance() {
    return this._distance;
  }

  set distance(value) {
    this._distance = value;
  }

  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
  }

  get elevation() {
    return this._elevation;
  }

  set elevation(value) {
    this._elevation = value;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get private() {
    return this._private;
  }

  set private(value) {
    this._private = value;
  }
}
