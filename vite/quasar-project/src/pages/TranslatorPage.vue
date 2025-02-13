<script setup>

import {useI18n} from 'vue-i18n';

const {t} = useI18n();
import { api } from "src/boot/axios.js"
async function translateFileToGerman() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Por favor, selecciona un archivo JSON");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = async function () {
    try {
      const jsonData = JSON.parse(reader.result); // Convertir el archivo JSON en un objeto JS

      // Hacer la petición al backend enviando el JSON en el body
      const translatedJson = (await api.post("translator/translateJsonAsText", jsonData, {
        params: { origen: "es", translated: "de" }, // Parámetros en la URL
        headers: { "Content-Type": "application/json" } // Indicar JSON en el cuerpo
      })).data;

      console.log("Traducción completa:", translatedJson);

      // Guardar el archivo traducido
      const blob = new Blob([JSON.stringify(translatedJson, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "de-DE.json";
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

</script>

<template>
  <div>HOLA</div>

  <div class="q-pa-md">
    <q-uploader
      label="Traducir archivo JSON a Cualquier idioma"
      auto-upload
      :url="getUrl"
      accept=".json"
    />
  </div>

  <div>
    <input type="file" id="fileInput" accept=".json" />
    <button @click="translateFileToGerman">Traducir a Alemán</button>
  </div>
</template>
