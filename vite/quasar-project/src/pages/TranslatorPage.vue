<script setup>

import {useI18n} from 'vue-i18n';

const {t} = useI18n();
import { api } from "src/boot/axios.js"
import {onMounted, ref} from "vue";
import {TranslatorService} from "src/service/TranslatorService.js";

const translatorService = new TranslatorService()
const selectedLanguage = ref(); // Estado reactivo para el idioma seleccionado
const languages = ref([]); // Lista de idiomas con su value y label


async function handleFileUpload(files) {
  if (!files.length) {
    alert("Por favor, selecciona un archivo JSON");
    return;
  }

  const file = files[0];
  const reader = new FileReader(); // es un objeto especial que nos permite leer archivos en JavaScript

  // Lee el archivo proporcionado (file) como texto y almacena su contenido en reader.result
  reader.readAsText(file);

  reader.onload = async function () { // Cuando el archivo se termine de leer, se ejecuta la función onload.
    try {
      const jsonData = JSON.parse(reader.result); // convierte el texto en un objeto JavaScript { }

      const translatedJson = await translatorService.translatedJson(jsonData, JSON.parse(localStorage.getItem("langToTransale")))


      console.log("Traducción completa:", translatedJson); // translatedJson almacena la respuesta del servidor, que es el archivo traducido.

      // Guardar el archivo traducido
      const blob = new Blob([JSON.stringify(translatedJson, null, 2)], { type: "application/json" }); // convierte el objeto traducido en texto JSON bien formateado.
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); // Crea una URL temporal en el navegador que apunta al archivo blob.

      const langTranslate = (JSON.parse(localStorage.getItem("langToTransale"))).toUpperCase();
      a.download = `ES-to-${langTranslate}.json`;  // Especifica el nombre del archivo traducido que se descargará.
      document.body.appendChild(a);
      a.click(); // Simula un clic para iniciar la descarga del archivo.
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
  console.log("Que guardo??", language);

  localStorage.setItem("langToTransale", JSON.stringify(language.id));

  console.log("Que guado??",  selectedLanguage.value.id);

  // Recuperamos el objeto desde localStorage y lo parseamos
  const getLocalLanguage = JSON.parse(localStorage.getItem("langToTransale"));

  // Ahora podemos acceder correctamente a `id` y `name`
  // console.log("Idioma guardado en localStorage:", getLocalLanguage);
};

const getAllLanguages = async () => {
  try {
    const allLanguages = await translatorService.getLanguages();
    // Asignamos los objetos Lenguaje completos a la lista
    languages.value = allLanguages;

  } catch (error) {
    console.error("Error al obtener los idiomas del servidor: ", error);
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
