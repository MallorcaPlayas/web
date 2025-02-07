import {FunctionProj} from "src/model/role/FunctionProj.js";

export class RoleHasFunction {
  id
  functionProj

  constructor(id, functionProj) {
    this.id = id;
    this.functionProj = functionProj;
  }

  static fromJson(json){
    return new RoleHasFunction(json.id,
      FunctionProj.fromJson(json.function),);
  }
}
