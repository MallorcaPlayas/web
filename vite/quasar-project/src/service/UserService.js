import { User } from "src/model/User.js";
import { api } from "src/boot/axios.js";

export class UserService {
  #BASE_PATH = "users";

  async getAll() {
    const data = (await api.get(this.#BASE_PATH + "/v2")).data;
    // console.log("data de usuarios ???", JSON.stringify(data, null, 2));


    const arrayUserNe =  data.map(n => {
      return{
        id: n.id, // cambiar por simplemente id, no id123
        userName: n.userName,
        name: n.name,
        firstSurname: n.firstSurname,
        secondSurname: n.secondSurname,
        email: n.email,
        birthday: UserService.formatDate(n.birthday) ,
        state: n.state,
        privatePrivacy: n.privatePrivacy,
        roles: Array.isArray(n.roles)
          ? n.roles.map(role => ({
            id: role.id,
            name: role.name
          }))
          : []
      }
    });

    // console.log("arrayUserNe ???", JSON.stringify(arrayUserNe, null, 2));
    // const arrayUser =  data.map(user => User.fromJson(user));
    //
    // console.log("arrayUser ???", JSON.stringify(arrayUser, null, 2));

    return arrayUserNe;
  }

  static formatDate(dateString) {
    if (!dateString) {
      return "2000-10-10"; // Fecha de nacimiento por defecto
    }
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "2000-05-05";  // Si la fecha no es válida, devolvemos la fecha por defecto
    }
    return date.toISOString().split("T")[0];
  }

  saveUser(user) {
    return api.post(this.#BASE_PATH, user);
  }

  updateUser(user) {
    return api.put(`${this.#BASE_PATH}/v2/${user.id123}`,
      {
        name: user.name,
        userName: user.userName,
        firstSurname: user.firstSurname,
        secondSurname: user.secondSurname,
        email: user.email,
        birthday: user.birthday,
        privatePrivacy: user.privatePrivacy,
        state: user.state,
      });
  }

  deleteUser(id) {
    return api.delete(`${this.#BASE_PATH}/${id}`);
  }
}
