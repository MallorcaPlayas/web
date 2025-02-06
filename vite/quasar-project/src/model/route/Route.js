import {User} from "src/model/User.js";
import {Location} from "src/model/route/Location.js"

export class Route {
  id
  name
  distance
  duration
  elevation
  locations
  user
  visibility


  constructor(id, name, distance, duration, elevation, locations, user, visibility) {
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.duration = duration;
    this.elevation = elevation;
    this.locations = locations;
    this.user = user;
    this.visibility = visibility;
  }

  static fromJson(json) {
    return new Route(
      json.id,
      json.name,
      json.distance,
      json.duration,
      json.elevation,
      json.locations.map(
        location => Location.fromJson(location)),
      json.user ?
        User.fromJson(json.user) : null,
      json.private
    );
  }
}
