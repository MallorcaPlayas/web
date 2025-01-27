export class Route{
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
}
