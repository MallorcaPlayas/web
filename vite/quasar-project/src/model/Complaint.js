import {date} from "quasar";
import {route} from "quasar/wrappers";

export class Complaint{
  _id
  _message
  _status
  _date
  _beach
  _route
  _user

  constructor(id, message, status, date, beach, route, user) {
    this._id = id;
    this._message = message;
    this._status = status;
    this._date = date;
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

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
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
