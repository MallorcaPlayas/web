export class RolV2 {
  id
  name


  constructor(name) {
    this.name = name;
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

  static fromJson(json) {
    // console.log("json de rol ???", JSON.stringify(json, null, 2));
    return new RolV2(json.id, json.name);
  }
}
