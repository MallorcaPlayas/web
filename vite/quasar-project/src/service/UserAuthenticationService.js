export class UserAuthenticationService {
  #URLGoogle = "http://localhost:8080/api/auth/loginGoogleAuth"
  #URL = "http://localhost:8080/api/auth/login"

  async getTokenSpringGoogleAuth(tokenGoogleAuth) {
    try {
      const response = await fetch(this.#URLGoogle, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({tokenGoogle: tokenGoogleAuth}),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // Devuelve el token del cuerpo de la respuesta
      const token = await response.text();
      return token;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return null;
      throw error;
    }
  }


  async getTokenSpringUserNameOrEmail(usernameorEmail, password) {
    try {
      const response = await fetch(this.#URL, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
          username: usernameorEmail,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      // Devuelve el token del cuerpo de la respuesta
      const token = await response.text();
      return token;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return null;
      throw error;
    }
  }
}

