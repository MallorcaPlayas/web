import {date} from "quasar";
import {route} from "quasar/wrappers";
import {Beach} from "src/model/beach/Beach.js";
import {Route} from "src/model/route/Route.js";
import {User} from "src/model/User.js";

export class Complaint{
  id
  message
  status
  date
  beach
  route
  user

  constructor(id, message, status, date, beach, route, user) {
    this.id = id;
    this.message = message;
    this.status = status;
    this.date = date;
    this.beach = beach;
    this.route = route;
    this.user = user;
  }

  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get message() {
    return this.message;
  }

  set message(value) {
    this.message = value;
  }

  get status() {
    return this.status;
  }

  set status(value) {
    this.status = value;
  }

  get date() {
    return this.date;
  }

  set date(value) {
    this.date = value;
  }

  get beach() {
    return this.beach;
  }

  set beach(value) {
    this.beach = value;
  }

  get route() {
    return this.route;
  }

  set route(value) {
    this.route = value;
  }

  get user() {
    return this.user;
  }

  set user(value) {
    this.user = value;
  }

  static fromJson(json){
    return new Complaint(json.id,
      json.message,
      json.status,
      json.date,
      Beach.fromJson(json.beach),
      Route.fromJson(json.route),
      User.fromJson(json.user)
    )
  }
}
