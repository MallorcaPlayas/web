export class UserRole{
  id
  role
  dateBegin
  dateEnd

  constructor(id, role, dateBegin, dateEnd) {
    this.id = id;
    this.role = role;
    this.dateBegin = dateBegin;
    this.dateEnd = dateEnd;
  }

  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get role() {
    return this.role;
  }

  set role(value) {
    this.role = value;
  }

  get dateBegin() {
    return this.dateBegin;
  }

  set dateBegin(value) {
    this.dateBegin = value;
  }

  get dateEnd() {
    return this.dateEnd;
  }

  set dateEnd(value) {
    this.dateEnd = value;
  }
}
