<script setup>

import {useI18n} from 'vue-i18n';

const {t} = useI18n();
import { api } from "src/boot/axios.js"
import {onMounted, ref} from "vue";
import {TranslatorService} from "src/service/TranslatorService.js";
const selectedLanguage = ref(); // Estado reactivo para el idioma seleccionado
const languages = ref([]); // Lista de idiomas con su value y label


async function handleFileUpload(files) {
  if (!files.length) {
    alert("Por favor, selecciona un archivo JSON");
    return;
  }


  const file = files[0];
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = async function () {
    try {
      const jsonData = JSON.parse(reader.result); // Convertir el archivo JSON en un objeto JS

      // Hacer la petición al backend enviando el JSON en el body
      const translatedJson = (await api.post("translator/translateJsonAsText", jsonData, {
        params: { origen: "es", translated: "de" }, // Parámetros en la URL.  Cambia el idioma según necesidad
        headers: { "Content-Type": "application/json" } // Indicar JSON en el cuerpo
      })).data;

      console.log("Traducción completa:", translatedJson);

      // Guardar el archivo traducido
      const blob = new Blob([JSON.stringify(translatedJson, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "de-DE.json";  // Cambia el nombre según idioma
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error al traducir:", error);
    }
  };

  reader.onerror = function () {
    alert("Error al leer el archivo JSON");
  };


}

onMounted(async () => {
  await getAllLanguages();

  const storedLanguage = localStorage.getItem("saveLanguage");
  if (storedLanguage) {
    selectedLanguage.value = JSON.parse(storedLanguage); // Recuperar el objeto
  }

});


const saveSelectedLanguage = (language) => {
  // Guardamos el objeto completo en localStorage como JSON
  localStorage.setItem("lang", JSON.stringify(language.id));


  // Recuperamos el objeto desde localStorage y lo parseamos
  const getLocalLanguage = JSON.parse(localStorage.getItem("lang"));

  // Ahora podemos acceder correctamente a `id` y `name`
  // console.log("Idioma guardado en localStorage:", getLocalLanguage);
};

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

</script>

<template>

  <div class="q-pa-lg">
    <!-- Contenedor principal con alineación en columna y centrado -->
    <div class="q-gutter-md row justify-center">
      <!-- Uploader -->

      <q-uploader
        :label="t('translatorPage.uploader.title')"
        accept=".json"
        :auto-upload="false"
        class="full-width q-mb-md"
        @added="handleFileUpload"
      />

      <!-- Selector de idioma -->
      <q-select
        v-model="selectedLanguage"
        :options="languages"
        option-value="id"
        option-label="name"
        :label="t('mainLayout.selectLanguage')"
        dense
        outlined
        class="q-mb-md"
        style="width: 250px"
        @update:model-value="saveSelectedLanguage"
      />
    </div>
  </div>



</template>
