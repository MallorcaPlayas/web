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

        <q-toolbar-title>{{ t('mainLayout.title') }}</q-toolbar-title>

        <q-select
          v-model="selectedLanguage"
          :options="languagesAvailable"
          option-value="id"
          option-label="nameLang"
          :label="t('mainLayout.selectLanguage')"
          dense
          outlined
          style="width: 150px; margin-right: 10px"
          @update:model-value="changeLanguage(selectedLanguage.id)"
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
        <q-item-label header> {{ t('mainLayout.admin') }} </q-item-label>
        <Link v-for="link in linksList" :key="link.link" v-bind="link"/>
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
import { getLinksList } from "src/constants/linksList.js";
import Link from "components/Link.vue";
import {onMounted, ref} from "vue";
import {TranslatorService} from "src/service/TranslatorService.js";
import {Lenguaje} from "src/model/Lenguaje.js";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const linksList = getLinksList(t); //  Llamamos a getLinksList pasando `t`

import {useLanguage} from "src/service/useLanguage.js";

const {languagesAvailable, changeLanguage} = useLanguage();

const drawerOpen = ref(false); // Estado inicial del menú lateral
// Estado reactivo para la lista de idiomas y el idioma seleccionado
const defaultLanguage = { id: "es", name: "Spanish" }; // Idioma por defecto
const languages = ref([]); // Lista de idiomas con su value y label
const selectedLanguage = ref(); // Estado reactivo para el idioma seleccionado

function openCloseDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const logout = () => {
  localStorage.removeItem("authToken"); // Eliminar token
  localStorage.removeItem("lang"); // Eliminar el idioma seleccionado
  window.location.reload(); // Recargar la página para aplicar la autenticación correctamente
};

// Función para obtener los idiomas
const getAllLanguages = async () => {
  try {
    const traductorService = new TranslatorService();
    const allLanguages = await traductorService.getLanguages();

    // Asignamos los objetos Lenguaje completos a la lista
    languages.value = allLanguages;

  } catch (error) {
    console.error("Error al obtener los idiomas:", error);
  }
};

// Función para guardar el idioma seleccionado en el localStorage
// const saveSelectedLanguage = (language) => {
//   // Guardamos el objeto completo en localStorage como JSON
//   localStorage.setItem("lang", JSON.stringify(language.id));
//
//
//   // Recuperamos el objeto desde localStorage y lo parseamos
//   const getLocalLanguage = JSON.parse(localStorage.getItem("lang"));
//
//   // Ahora podemos acceder correctamente a `id` y `name`
//   // console.log("Idioma guardado en localStorage:", getLocalLanguage);
// };

// Llamar a la función para obtener los idiomas al montar el componente
onMounted(async () => {
  await getAllLanguages();

  // TODO Recuperar el idioma seleccionado del localStorage
  // const storedLanguage = localStorage.getItem("saveLanguage");
  // if (storedLanguage) {
  //   selectedLanguage.value = JSON.parse(storedLanguage); // Recuperar el objeto
  // }

});

</script>

