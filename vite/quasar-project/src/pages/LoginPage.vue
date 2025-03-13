<script setup>
import {
  GoogleSignInButton,
} from "vue3-google-signin";

import {AuthenticationService} from "../service/AuthenticationService.js";
import GoogleSignInPlugin from "vue3-google-signin";

import {ref} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n"; // Importa Vue Router
const { locale } = useI18n(); // para poder elegir el español como idioma predeterminador

const router = useRouter(); // Inicializa el router



// Estado de los campos
const password = ref("");
const isPwd = ref(true);
const email = ref("");

const loginErrorGoogle = ref(""); // Almacena el mensaje de error
const loginError = ref(""); // Almacena el mensaje de error

const URLAPI = process.env.API_SPRING_BASE_URL;
console.log("Ip que se utiliza en produccion -> .env.prod", URLAPI);

const UserAuthentication = new AuthenticationService();


// Manejo del inicio de sesión con Google
const handleLoginSuccess = async (response) => {
  resetErrors();

  const {credential} = response;
  const getTokenSpring = await UserAuthentication.getTokenSpringGoogleAuth(credential);

  validateToken(getTokenSpring, true);
};



const signIn = async () => {
  resetErrors();

  // cogemos los valores de los campos email y password
  const emailValue = email.value;
  const passwordValue = password.value;

  if (validateEmailAndPassword(emailValue, passwordValue)) {
    return; // Si la validación falla, detenemos el proceso
  }
  const getTokenSpring = await UserAuthentication.getTokenSpringUserNameOrEmail(emailValue, passwordValue);
  validateToken(getTokenSpring, false);
};


function resetErrors() {
  loginErrorGoogle.value = "";
  loginError.value = "";
}

function validateEmailAndPassword(emailValue, passwordValue) {


  if (!emailValue || !passwordValue) {
    loginError.value = "El correo electrónico y la contraseña son obligatorios.";
    return true;
  }
}


function validateToken(getTokenSpring, fromGoogle) {

  if (getTokenSpring) {
    localStorage.setItem("authToken", getTokenSpring);
    // Añadir un idioma por defecto:
    localStorage.setItem('lang', "es-ES");
    locale.value = localStorage.getItem('lang');

    router.push("/"); // Redirige al usuario a la página principal
  } else {
    // Si el token es null, mostramos un mensaje de error
    if (fromGoogle) {
      loginErrorGoogle.value = "El correo electrónico no está registrado. No puedes iniciar sesión con Google.";
    }else {
      loginError.value = "El correo electrónico o la contraseña no son correctos.";
    }
    console.error("No se recibió un token válido desde el servidor.");
  }
}
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<template>
  <div class="full-height bg-grey-2 flex flex-center">
    <q-card flat bordered class="rounded-lg q-pa-lg" style="width: 400px;">
      <!-- Título -->
      <div class="text-h5 text-center q-mb-md">
        Iniciar sesión
      </div>

      <!-- Email Input -->
      <q-input
        v-model="email"
        filled
        dense
        type="email"
        label="Email or username"
        class="q-mb-md"
        :rules="[val => !!val || 'Username or email is required']"
      />

      <!-- Password Input -->
      <q-input
        v-model="password"
        filled
        dense
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        class="q-mb-md"
        :rules="[val => !!val || 'Password is required']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <!-- Forgot Password -->
      <div class="text-caption text-right q-mb-lg">
        <q-btn flat label="Forgot password?" class="text-primary"/>
      </div>

      <!-- Sign In Button -->
      <q-btn
        label="Sign in"
        color="primary"
        unelevated
        class="full-width q-mb-lg"
        @click="signIn"
      />

      <q-banner v-if="loginError" class="bg-red text-white q-mb-md">
        {{ loginError }}
      </q-banner>

      <!-- Divider -->
      <div class="flex items-center q-mb-lg">
        <div class="q-mr-sm" style="flex: 1; height: 1px; background: #ccc;"></div>
        <div class="text-caption">or</div>
        <div class="q-ml-sm" style="flex: 1; height: 1px; background: #ccc;"></div>
      </div>

      <!-- Google Sign-In Button -->

      <GoogleSignInButton
        theme="filled_blue"
        @success="handleLoginSuccess"
        @error="handleLoginError"
        class="full-width"
      ></GoogleSignInButton>

      <q-banner v-if="loginErrorGoogle" class="bg-red text-white q-mb-md">
        {{ loginErrorGoogle }}
      </q-banner>


    </q-card>
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
