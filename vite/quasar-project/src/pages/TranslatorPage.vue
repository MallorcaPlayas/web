<script setup>

import {useI18n} from 'vue-i18n';

const {t} = useI18n();
import { api } from "src/boot/axios.js"
import {onMounted, ref} from "vue";
import {TranslatorService} from "src/service/TranslatorService.js";

const translatorService = new TranslatorService()
const selectedLanguage = ref(); // Estado reactivo para el idioma seleccionado
const languages = ref([]); // Lista de idiomas con su value y label
const { locale, setLocaleMessage } = useI18n();

// <!--    Todo: Refactorizar-->

// Función para cambiar de idioma
const changeLanguage = async (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", lang);

  try {
    console.log("que envio a la funcion", lang);
    const translatedJson = await translatorService.fetchTranslatedJson(lang);
    if (translatedJson) {
      setLocaleMessage(lang, translatedJson);
    }
  } catch (error) {
    console.error("Error al cargar idioma:", error);
  }
};
// <!--    Todo: fin Refactorizar-->

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

      // translatedJson almacena la respuesta del servidor, que es el archivo traducido.
      const translatedJson = await translatorService.translatedJson(jsonData, JSON.parse(localStorage.getItem("langToTransale")))


      // convierte el objeto traducido en texto JSON bien formateado.
      const blob = new Blob([JSON.stringify(translatedJson, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); // Crea una URL temporal (blob:http://localhost:3000/87e5c9d0-4a23-4fbb-9c77-d712b2baf9e5) en el navegador que apunta al archivo blob.

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

const downloadTranslationBase = () => {
  const url = "/utilTransalatorExample/PlantillaEs.json"; // Ruta pública del archivo
  const a = document.createElement("a");
  a.href = url;
  a.download = "PlantillaEs.json"; // Nombre del archivo al descargar
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


const saveSelectedLanguage = (language) => {

  // Guardamos el id del idioma seleccionado en localStorage como JSON
  localStorage.setItem("langToTransale", JSON.stringify(language.id)); // JSON.stringify() convierte un objeto JavaScript en una cadena de texto en formato JSON.

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

onMounted(async () => {
  await getAllLanguages();
});
</script>

<template>

  <!--    Todo: Refactorizar-->
  <div>
    <h1>{{ $t('hello') }}</h1>  <!-- Traducción automática -->
    <p>{{ $t('welcome') }}</p>
    <button @click="changeLanguage('en')">🇺🇸 English</button>
    <button @click="changeLanguage('es')">🇪🇸 Español</button>
    <button @click="changeLanguage('fr')">🇫🇷 Français</button>
  </div>

  <!--    Todo: Fin de Refactorizar-->

  <div class="q-pa-lg">
    <!-- Contenedor principal con alineación en columna y centrado -->
    <div class="q-gutter-md row justify-center">
      <!-- Uploader -->

      <q-btn
        color="primary"
        unelevated
        class="full-width q-mb-md"
        :disable="!selectedLanguage"
      >
        <q-uploader
          :label="t('translatorPage.uploader.title')"
          accept=".json"
          :auto-upload="false"
          class="full-width"
          @added="handleFileUpload"
        />

        <q-tooltip v-if="!selectedLanguage" class="bg-red">
          {{ t('translatorPage.warningSelectLanguage') }}
        </q-tooltip>
      </q-btn>

      <q-btn
        color="secondary"
        unelevated
        class="q-mt-md"
        @click="downloadTranslationBase"
      >
        Descargar Plantilla (ES)
      </q-btn>

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
