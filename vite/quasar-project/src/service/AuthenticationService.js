import { api } from "src/boot/axios.js";
export class AuthenticationService {

  #BASE_PATH = `auth`
  async getTokenSpringGoogleAuth(tokenGoogleAuth) {
    return (await api.post(`${this.#BASE_PATH}/loginGoogleAuth`,
      new URLSearchParams({
        tokenGoogle: tokenGoogleAuth
      }),
    )).data;
  }

  async getTokenSpringUserNameOrEmail(usernameOrEmail, password) {
    return (await api.post(`${this.#BASE_PATH}/login`,
      new URLSearchParams({username: usernameOrEmail, password}),
      {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
    )).data;
  }
}



