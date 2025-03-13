export class RoleRequestAprovalOrReject {
  id
  approved


  constructor(id, approved) {
    this.id = id;
    this.approved = approved;
  }


  get id() {
    return this.id;
  }

  set id(value) {
    this.id = value;
  }

  get approved() {
    return this.approved;
  }

  set approved(value) {
    this.approved = value;
  }

  static fromJson(json){
    return new RoleRequestAprovalOrReject(
      json.id,
      json.approved
    );
  }
}
