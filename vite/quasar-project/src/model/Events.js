import {comment} from "postcss";
import {route} from "quasar/wrappers";

export class Events {
  #id
  #editedDate
  #rating
  #comment
  #publishedDate
  #beach
  #route
  #user

  constructor(id, editedDate, rating, comment, publishedDate, beach, route, user) {
    this.#id = id;
    this.#editedDate = editedDate;
    this.#rating = rating;
    this.#comment = comment;
    this.#publishedDate = publishedDate;
    this.#beach = beach;
    this.#route = route;
    this.#user = user;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get editedDate() {
    return this.#editedDate;
  }

  set editedDate(value) {
    this.#editedDate = value;
  }

  get rating() {
    return this.#rating;
  }

  set rating(value) {
    this.#rating = value;
  }

  get comment() {
    return this.#comment;
  }

  set comment(value) {
    this.#comment = value;
  }

  get publishedDate() {
    return this.#publishedDate;
  }

  set publishedDate(value) {
    this.#publishedDate = value;
  }

  get beach() {
    return this.#beach;
  }

  set beach(value) {
    this.#beach = value;
  }

  get route() {
    return this.#route;
  }

  set route(value) {
    this.#route = value;
  }

  get user() {
    return this.#user;
  }

  set user(value) {
    this.#user = value;
  }
}
