<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="openCloseDrawer()"
        />

        <q-toolbar-title>Mallorca Playa</q-toolbar-title>

        <q-select
          v-model="selectedLanguage"
          :options="languages"
          option-value="code"
          option-label="name"
          label="Idioma"
          dense
          outlined
          style="width: 150px; margin-right: 10px"
          @update:model-value="saveSelectedLanguage"
        />

        <q-btn round>
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="profile image">
          </q-avatar>
        </q-btn>
        <div style="width: 16px;"></div>
        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout">
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" bordered>
      <q-list>
        <q-item-label header>Panel de Administración</q-item-label>
        <Link v-for="link in linksList" v-bind="link"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import {linksList} from "src/constants/linksList.js";
import Link from "components/Link.vue";
import {onMounted, ref} from "vue";
import {TranslatorService} from "src/service/TranslatorService.js";

const drawerOpen = ref(false); // Estado inicial del menú lateral
// Estado reactivo para la lista de idiomas y el idioma seleccionado
const languages = ref([]);
const selectedLanguage = ref(localStorage.getItem("selectedLanguage") || null);

function openCloseDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const logout = () => {
  localStorage.removeItem("authToken"); // Eliminar token
  window.location.reload(); // Recargar la página para aplicar la autenticación correctamente
};

// Función para obtener los idiomas
const getAllLanguages = async () => {

    const traductorService = new TranslatorService();
    const allLanguages = await traductorService.getLanguages();
    console.log("Todos los idiomas NAME:", allLanguages);
    languages.value = allLanguages.map((language) =>  language.name);

};

// Función para guardar el idioma seleccionado en el localStorage
const saveSelectedLanguage = (languageCode) => {
  localStorage.setItem("selectedLanguage", languageCode);
  console.log("Idioma guardado en localStorage:", languageCode);
};

// Llamar a la función para obtener los idiomas al montar el componente
onMounted(() => {
  getAllLanguages();

  // Comprobar si ya hay un idioma seleccionado en localStorage
  const storedLanguage = localStorage.getItem("selectedLanguage");
  if (storedLanguage) {
    selectedLanguage.value = storedLanguage;
  }
});

</script>

