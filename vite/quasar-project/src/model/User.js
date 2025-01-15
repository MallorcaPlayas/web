export class User {
  #id
  #nombreUsuario
  #nombre
  #primerApellido
  #segundoApellido
  #fechaNacimiento
  #email
  #urlFotoPerfil
  #visibilidad; // publico, privado
  #estado // activo, inactivo
  #roles // array de roles


  constructor(id, nombreUsuario, nombre, primerApellido, segundoApellido, fechaNacimiento, email, urlFotoPerfil, visibilidad, estado, roles) {
    this.#id = id;
    this.#nombreUsuario = nombreUsuario;
    this.#nombre = nombre;
    this.#primerApellido = primerApellido;
    this.#segundoApellido = segundoApellido;
    this.#fechaNacimiento = fechaNacimiento;
    this.#email = email;
    this.#urlFotoPerfil = urlFotoPerfil;
    this.#visibilidad = visibilidad;
    this.#estado = estado;
    this.#roles = roles;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get nombreUsuario() {
    return this.#nombreUsuario;
  }

  set nombreUsuario(value) {
    this.#nombreUsuario = value;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(value) {
    this.#nombre = value;
  }

  get primerApellido() {
    return this.#primerApellido;
  }

  set primerApellido(value) {
    this.#primerApellido = value;
  }

  get segundoApellido() {
    return this.#segundoApellido;
  }

  set segundoApellido(value) {
    this.#segundoApellido = value;
  }

  get fechaNacimiento() {
    return this.#fechaNacimiento;
  }

  set fechaNacimiento(value) {
    this.#fechaNacimiento = value;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get urlFotoPerfil() {
    return this.#urlFotoPerfil;
  }

  set urlFotoPerfil(value) {
    this.#urlFotoPerfil = value;
  }

  get visibilidad() {
    return this.#visibilidad;
  }

  set visibilidad(value) {
    this.#visibilidad = value;
  }

  get estado() {
    return this.#estado;
  }

  set estado(value) {
    this.#estado = value;
  }

  get roles() {
    return this.#roles;
  }

  set roles(value) {
    this.#roles = value;
  }
}

