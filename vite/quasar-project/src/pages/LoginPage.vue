<script setup>
import {
  GoogleSignInButton,
} from "vue3-google-signin";

import {UserAuthenticationService} from "../service/UserAuthenticationService.js";
import GoogleSignInPlugin from "vue3-google-signin"



import {useRouter} from 'vue-router'; // Importa Vue Router

const router = useRouter(); // Inicializa el router

// handle success event
const handleLoginSuccess = async (response) => {
  const {credential} = response;
  console.log("Access Token", credential);

  // Use the access token to authenticate with your server

  const UserAuthentication = new UserAuthenticationService();

  const getTokenSpring = await UserAuthentication.getTokenSpring(credential);

  console.log("Token Spring", getTokenSpring);


  // Guardar el token en localStorage
  if (getTokenSpring) {
    localStorage.setItem("authToken", getTokenSpring);
    console.log("Token Spring guardado en localStorage:", getTokenSpring);


    // Redirigir al usuario a la página principal después del login
    router.push('/');
  } else {
    console.error("No se recibió un token válido desde el servidor.");
  }

  const token = localStorage.getItem("authToken");


  if (token) {
    console.log("Token recuperado del LocalStorage:", token);
    // Aquí puedes usar el token donde lo necesites
  } else {
    console.error("No se encontró el token en localStorage");
  }

};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<template>

  <h1>Login</h1>


  <GoogleSignInButton
    theme="filled_blue"
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>

<style scoped lang="sass">

</style>
