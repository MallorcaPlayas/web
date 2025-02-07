export class RoleRequest {
  id
  user
  role
  urlPhotoDni
  urlOfficialDoc
  approved

  constructor(id, user, role, urlPhotoDni, urlOfficialDoc, approved) {
    this.id = id;
    this.user = user;
    this.role = role;
    this.urlPhotoDni = urlPhotoDni;
    this.urlOfficialDoc = urlOfficialDoc;
    this.approved = approved;
  }

  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get user() {
    return this.user;
  }

  set user(value) {
    this.user = value;
  }

  get role() {
    return this.role;
  }

  set role(value) {
    this.role = value;
  }

  get urlPhotoDni() {
    return this.urlPhotoDni;
  }

  set urlPhotoDni(value) {
    this.urlPhotoDni = value;
  }

  get urlOfficialDoc() {
    return this.urlOfficialDoc;
  }

  set urlOfficialDoc(value) {
    this.urlOfficialDoc = value;
  }

  get approved() {
    return this.approved;
  }

  set approved(value) {
    this.approved = value;
  }

  static fromJson(json){
    return new RoleRequest(json.id,
      json.user.email,
      json.role.name,
      json.urlPhotoDni,
      json.urlOfficialDoc,
      json.approved
    );
  }
}
