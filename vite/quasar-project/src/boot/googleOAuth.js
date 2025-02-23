import {defineBoot} from "#q-app/wrappers";
import GoogleSignInPlugin from "vue3-google-signin"

// Para que funcione se tiene que poner el siguiente comando en vite:
// npm install -S vue3-google-signin
// mas info leer la documnetacion: https://www.npmjs.com/package/vue3-google-signin

export default defineBoot(({app}) => {
  app.use(GoogleSignInPlugin, {
    clientId: process.env.GOOGLE_CLIENT_ID,
  });
  document.addEventListener("DOMContentLoaded", () => {
    app.mount("#app");
  });
})



// Que hago con el Acces Token?
// Coger el Payload, coger el email y hacer una petición a la base de datos para ver si existe el usuario
// y mirar que rol tiene ese usuario. Luego tenemos que crear JWT.
// Que es JWT? Es un token que se crea con un payload y una clave secreta.


