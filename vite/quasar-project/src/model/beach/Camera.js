import * as url from "node:url";

export class Camera {
  _id
  _url

  constructor(id, url) {
    this._id = id;
    this._url = url;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get url() {
    return this._url;
  }

  set url(value) {
    this._url = value;
  }
}
