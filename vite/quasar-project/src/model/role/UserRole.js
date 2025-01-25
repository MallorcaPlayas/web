export class UserRole{
  _id
  _role
  _dateBegin
  _dateEnd

  constructor(id, role, dateBegin, dateEnd) {
    this._id = id;
    this._role = role;
    this._dateBegin = dateBegin;
    this._dateEnd = dateEnd;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get role() {
    return this._role;
  }

  set role(value) {
    this._role = value;
  }

  get dateBegin() {
    return this._dateBegin;
  }

  set dateBegin(value) {
    this._dateBegin = value;
  }

  get dateEnd() {
    return this._dateEnd;
  }

  set dateEnd(value) {
    this._dateEnd = value;
  }
}
