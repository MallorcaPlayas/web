export class RoleRequest {
  _id
  _user
  _role
  _urlPhotoDni
  _urlOfficialDoc
  _approved

  constructor(id, user, role, urlPhotoDni, urlOfficialDoc, approved) {
    this._id = id;
    this._user = user;
    this._role = role;
    this._urlPhotoDni = urlPhotoDni;
    this._urlOfficialDoc = urlOfficialDoc;
    this._approved = approved;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get role() {
    return this._role;
  }

  set role(value) {
    this._role = value;
  }

  get urlPhotoDni() {
    return this._urlPhotoDni;
  }

  set urlPhotoDni(value) {
    this._urlPhotoDni = value;
  }

  get urlOfficialDoc() {
    return this._urlOfficialDoc;
  }

  set urlOfficialDoc(value) {
    this._urlOfficialDoc = value;
  }

  get approved() {
    return this._approved;
  }

  set approved(value) {
    this._approved = value;
  }
}
