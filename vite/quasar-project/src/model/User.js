import {UserHasRole} from "src/model/role/UserHasRole.js";
import {Organization} from "src/model/Organization.js";
import {Photo} from "src/model/Photo.js";
import {RolV2} from "src/model/role/RolV2.js";

export class User {
  id
  name
  userName
  firstSurname
  secondSurname
  email
  birthday
  photo
  privatePrivacy; // publico, privado
  state // activo, inactivo
  organization
  roles // array de roles


  constructor(id, name, userName, firstSurname, secondSurname, email, birthday, photo, privatePrivacy, state, organization, roles) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.firstSurname = firstSurname;
    this.secondSurname = secondSurname;
    this.email = email;
    this.birthday = birthday;
    this.photo = photo;
    this.privatePrivacy = privatePrivacy;
    this.state = state;
    this.organization = organization;
    this.roles = roles;
  }


  static fromJson(json) {
    return new User(
      json.id,
      json.name,
      json.userName,
      json.firstSurname,
      json.secondSurname,
      json.email,
      User.formatDate(json.birthday),
      json.photo ? Photo.fromJson(json.photo) : null,
      json.privatePrivacy,
      json.state,
      json.organization ? Organization.fromJson(json.organization) : null,
      Array.isArray(json.roles) // Asegurar que roles es un array antes de mapear
        ? json.roles.map(role => RolV2.fromJson(role))
        : []
    );
  }

  static formatDate(dateString) {
    if (!dateString) {
      return "2000-01-01"; // Fecha de nacimiento por defecto
    }
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "2000-01-01"; // Si la fecha no es válida, devolvemos la fecha por defecto
    }
    // Formatear la fecha como `yyyy-MM-dd`
    return date.toISOString().split("T")[0];
  }
}

