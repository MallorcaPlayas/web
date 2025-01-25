export class Organization {
  _id
  _name
  _documentation
  _contactNumber

  constructor(id, name, documentation, contactNumber) {
    this._id = id;
    this._name = name;
    this._documentation = documentation;
    this._contactNumber = contactNumber;
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

  get documentation() {
    return this._documentation;
  }

  set documentation(value) {
    this._documentation = value;
  }

  get contactNumber() {
    return this._contactNumber;
  }

  set contactNumber(value) {
    this._contactNumber = value;
  }
}
