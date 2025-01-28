import {FunctionProj} from "src/model/role/FunctionProj.js";


export class FunctionService {
  #URL = "http://localhost:8080/api/functions";


  async getAll(){
    const data = await fetch(this.#URL,{
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const functions = await data.json()
    return functions.map(funct => {
      return new FunctionProj(funct.id, funct.name);
    })
  }

  create(funct) {
    fetch(this.#URL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(funct)
    });
  }

  update(funct) {
    fetch(this.#URL + "/"+ funct.id, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(funct)
    });
  }

  delete(id) {
    fetch(this.#URL + "/" + id, {
      method: "DELETE",
    });
  }
}
