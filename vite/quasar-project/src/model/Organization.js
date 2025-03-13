export class Organization {
  id
  name
  contactNumber

  constructor(id, name, documentation, contactNumber) {
    this.id = id;
    this.name = name;
    this.contactNumber = contactNumber;
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

  get contactNumber() {
    return this.contactNumber;
  }

  set contactNumber(value) {
    this.contactNumber = value;
  }

  static fromJson(json){
    return new Organization(
      json.id,
      json.name,
      json.contactNumber
    )
  }
}
