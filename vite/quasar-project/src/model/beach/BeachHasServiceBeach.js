import {ServiceBeach} from "src/model/beach/ServiceBeach.js";

export class BeachHasServiceBeach {
  id
  serviceBeach
  startTime
  endTime

  constructor(id, serviceBeach, startTime, endTime) {
    this.id = id;
    this.serviceBeach = serviceBeach;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get serviceBeach() {
    return this.serviceBeach;
  }

  set serviceBeach(value) {
    this.serviceBeach = value;
  }

  get startTime() {
    return this.startTime;
  }

  set startTime(value) {
    this.startTime = value;
  }

  get endTime() {
    return this.endTime;
  }

  set endTime(value) {
    this.endTime = value;
  }

  static fromJson(json){
    return new BeachHasServiceBeach(json.id,
      ServiceBeach.fromJson(json.serviceBeach),
      json.startTime,
      json.endTime);
  }
}
