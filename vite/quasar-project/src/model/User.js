export class User {
  id
  name
  userName
  firstSurname
  secondSurname
  email
  birthday
  urlPhoto
  privatePrivacy; // publico, privado
  state // activo, inactivo
  organization
  roles // array de roles


  constructor(id, name, userName, firstSurname, secondSurname, email, birthday, urlPhoto, privatePrivacy, state, organization, roles) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.firstSurname = firstSurname;
    this.secondSurname = secondSurname;
    this.email = email;
    this.birthday = birthday;
    this.urlPhoto = urlPhoto;
    this.privatePrivacy = privatePrivacy;
    this.state = state;
    this.organization = organization;
    this.roles = roles;
  }


  static fromJson(json){
    new User(
      json.id,
      json.name,
      json.userName,
      json.firstSurname,
      json.secondSurname,
      json.email,
      json.birthday,
      json.urlPhoto,
      json.privatePrivacy,
      json.state,
      null
    );
  }
}

