<script setup>
import {
  GoogleSignInButton,
} from "vue3-google-signin";

import { UserAuthenticationService } from "../service/UserAuthenticationService.js";
import GoogleSignInPlugin from "vue3-google-signin";

import { ref } from "vue";
import { useRouter } from "vue-router"; // Importa Vue Router

const router = useRouter(); // Inicializa el router

// Estado de los campos
const password = ref("");
const isPwd = ref(true);
const email = ref("");

// Manejo del inicio de sesión con Google
const handleLoginSuccess = async (response) => {
  const { credential } = response;
  console.log("Access Token", credential);

  const UserAuthentication = new UserAuthenticationService();
  const getTokenSpring = await UserAuthentication.getTokenSpringGoogleAuth(credential);

  console.log("Token Spring", getTokenSpring);

  if (getTokenSpring) {
    localStorage.setItem("authToken", getTokenSpring);
    console.log("Token Spring guardado en localStorage:", getTokenSpring);

    router.push("/"); // Redirige al usuario a la página principal
  } else {
    console.error("No se recibió un token válido desde el servidor.");
  }
};

const signIn = async () => {
  console.log("Sign in");
  // Lógica de inicio de sesión
  // cogemos los valores de los campos email y password
  const emailValue = email.value;
  const passwordValue = password.value;
  console.log("Email:", emailValue);
  console.log("Password:", passwordValue);

  const UserAuthentication = new UserAuthenticationService();
  const getTokenSpring = await UserAuthentication.getTokenSpringUserNameOrEmail(emailValue, passwordValue);

  console.log("Token Spring", getTokenSpring);

  if (getTokenSpring) {
    localStorage.setItem("authToken", getTokenSpring);
    console.log("Token Spring guardado en localStorage:", getTokenSpring);

    router.push("/"); // Redirige al usuario a la página principal
  } else {
    console.error("No se recibió un token válido desde el servidor.");
  }
};

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
      />

      <!-- Password Input -->
      <q-input
        v-model="password"
        filled
        dense
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        class="q-mb-md"
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
        <q-btn flat label="Forgot password?" class="text-primary" />
      </div>

      <!-- Sign In Button -->
      <q-btn
        label="Sign in"
        color="primary"
        unelevated
        class="full-width q-mb-lg"
        @click="signIn"
      />

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


    </q-card>
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
