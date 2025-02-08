import {RoleHasFunction} from "src/model/role/RoleHasFunction.js";

export class Rol {
  id
  name
  price
  description
  functions

  constructor(id, name, price, description, functions) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.functions = functions;
  }

  static fromJson(json){
    return new Rol(
      json.id,
      json.name,
      json.price,
      json.description,
      json.functions.map(fun => RoleHasFunction.fromJson(fun))
    )
  }

}
