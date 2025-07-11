export class Location {
  id
  latitude
  longitude
  elevation
  time
  routeId


  constructor(id, latitude, longitude, elevation, time, routeId) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.elevation = elevation;
    this.time = time;
    this.routeId = routeId;
  }

  static fromJson(json){
    return new Location(
      json.id,
      json.latitude,
      json.longitude,
      json.elevation,
      json.time,
      json.routeId)
  }
}
