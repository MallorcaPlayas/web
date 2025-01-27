import * as url from "node:url";

export class Camera {
  id
  url

  constructor(id, url) {
    this.id = id;
    this.url = url;
  }

  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get url() {
    return this.url;
  }

  set url(value) {
    this.url = value;
  }
}
