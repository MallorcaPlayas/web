import {comment} from "postcss";
import {route} from "quasar/wrappers";

export class Events {
  _id
  _editedDate
  _rating
  _comment
  _publishedDate
  _beach
  _route
  _user

  constructor(id, editedDate, rating, comment, publishedDate, beach, route, user) {
    this._id = id;
    this._editedDate = editedDate;
    this._rating = rating;
    this._comment = comment;
    this._publishedDate = publishedDate;
    this._beach = beach;
    this._route = route;
    this._user = user;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get editedDate() {
    return this._editedDate;
  }

  set editedDate(value) {
    this._editedDate = value;
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    this._rating = value;
  }

  get comment() {
    return this._comment;
  }

  set comment(value) {
    this._comment = value;
  }

  get publishedDate() {
    return this._publishedDate;
  }

  set publishedDate(value) {
    this._publishedDate = value;
  }

  get beach() {
    return this._beach;
  }

  set beach(value) {
    this._beach = value;
  }

  get route() {
    return this._route;
  }

  set route(value) {
    this._route = value;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }
}
