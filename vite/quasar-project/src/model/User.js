export class User {
  _id
  _nombreUsuario
  _nombre
  _primerApellido
  _segundoApellido
  _email
  _fechaNacimiento

  _urlFotoPerfil
  _visibilidad; // publico, privado
  _estado // activo, inactivo
  _rol // array de roles


  constructor(id, nombreUsuario, nombre, primerApellido, segundoApellido, email, fechaNacimiento, urlFotoPerfil, visibilidad, estado, rol) {
    this._id = id;
    this._nombreUsuario = nombreUsuario;
    this._nombre = nombre;
    this._primerApellido = primerApellido;
    this._segundoApellido = segundoApellido;
    this._email = email;
    this._fechaNacimiento = fechaNacimiento;
    this._urlFotoPerfil = urlFotoPerfil;
    this._visibilidad = visibilidad;
    this._estado = estado;
    this._rol = rol;
  }



  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get nombreUsuario() {
    return this._nombreUsuario;
  }

  set nombreUsuario(value) {
    this._nombreUsuario = value;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(value) {
    this._nombre = value;
  }

  get primerApellido() {
    return this._primerApellido;
  }

  set primerApellido(value) {
    this._primerApellido = value;
  }

  get segundoApellido() {
    return this._segundoApellido;
  }

  set segundoApellido(value) {
    this._segundoApellido = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get fechaNacimiento() {
    return this._fechaNacimiento;
  }

  set fechaNacimiento(value) {
    this._fechaNacimiento = value;
  }

  get urlFotoPerfil() {
    return this._urlFotoPerfil;
  }

  set urlFotoPerfil(value) {
    this._urlFotoPerfil = value;
  }

  get visibilidad() {
    return this._visibilidad;
  }

  set visibilidad(value) {
    this._visibilidad = value;
  }

  get estado() {
    return this._estado;
  }

  set estado(value) {
    this._estado = value;
  }

  get rol() {
    return this._rol;
  }

  set rol(value) {
    this._rol = value;
  }
}

