export class Organization {
  #id
  #name
  #documentation
  #contactNumber

  constructor(id, name, documentation, contactNumber) {
    this.#id = id;
    this.#name = name;
    this.#documentation = documentation;
    this.#contactNumber = contactNumber;
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

  get documentation() {
    return this.#documentation;
  }

  set documentation(value) {
    this.#documentation = value;
  }

  get contactNumber() {
    return this.#contactNumber;
  }

  set contactNumber(value) {
    this.#contactNumber = value;
  }
}
