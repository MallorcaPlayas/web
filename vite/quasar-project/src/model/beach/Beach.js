import {TypeBeach} from "src/model/beach/TypeBeach.js";
import {Camera} from "src/model/beach/Camera.js";
import {User} from "src/model/User.js";
import {Service} from "src/model/beach/Service.js";
import {ServiceBeach} from "src/model/beach/ServiceBeach.js";
import {Photo} from "src/model/Photo.js";

export class Beach{
  id
  name
  description
  types
  cameras
  usersInCharge
  services
  photos

  constructor(id, name, description, types, cameras, usersInCharge, services , photos) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.types = types;
    this.cameras = cameras;
    this.usersInCharge = usersInCharge;
    this.services = services;
    this.photos = photos
  }

  static fromJson(json){
    return new Beach(
      json.id,
      json.name,
      json.description,
      json.types.map(type => TypeBeach.fromJson(type)),
      json.cameras.map(camera => Camera.fromJson(camera)),
      json.usersInCharge.map((userInCharge) => User.fromJson(userInCharge)),
      json.services.map(service => Service.fromJson(service)),
      json.photos.map(photo => Photo.fromJson(photo)),
    )
  }
}
