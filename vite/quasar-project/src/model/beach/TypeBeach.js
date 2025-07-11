export class TypeBeach {
  id
  name

  constructor(id, name) {
    this.id = id;
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

  static fromJson(json){
    return new TypeBeach(json.id, json.name);
  }
}
