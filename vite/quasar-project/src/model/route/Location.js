export class Location {
  id
  longitude
  latitude
  elevation
  time
  routeId


  constructor(id, longitude, latitude, elevation, time, routeId) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.elevation = elevation;
    this.time = time;
    this.routeId = routeId;
  }
}
