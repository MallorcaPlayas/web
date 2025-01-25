export class Service {
  _id
  _serviceBeach
  _startTime
  _endTime

  constructor(id, serviceBeach, startTime, endTime) {
    this._id = id;
    this._serviceBeach = serviceBeach;
    this._startTime = startTime;
    this._endTime = endTime;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get serviceBeach() {
    return this._serviceBeach;
  }

  set serviceBeach(value) {
    this._serviceBeach = value;
  }

  get startTime() {
    return this._startTime;
  }

  set startTime(value) {
    this._startTime = value;
  }

  get endTime() {
    return this._endTime;
  }

  set endTime(value) {
    this._endTime = value;
  }
}
