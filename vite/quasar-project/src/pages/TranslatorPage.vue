<script setup>

import {useI18n} from 'vue-i18n';

const {t} = useI18n();
import {api} from "src/boot/axios.js"
import {onMounted, ref} from "vue";
import {TranslatorService} from "src/service/TranslatorService.js";
import {useLanguage} from "src/service/useLanguage.js";

const {languagesAvailable, getAllLanguagesAvailable, changeLanguage} = useLanguage();

const translatorService = new TranslatorService()
const selectedLanguage = ref(); // Estado reactivo para el idioma seleccionado
const languages = ref([]); // Lista de idiomas con su value y label


const editDialog = ref(false);
const editLanguageData = ref({id: "", nameLang: "", translations: ""});

const filteredLanguages = ref([]);





const generateTranslation = async () => {
  if (!selectedLanguage.value) {
    alert("Por favor, selecciona un idioma.");
    return;
  }

  try {
    //  Cargar el JSON local
    const response = await fetch("/utilTransalatorExample/PlantillaEs.json");
    if (!response.ok) throw new Error("Error al cargar el archivo base");
    const jsonDatalanguageSpanish  = await response.json();

    //  Obtener valores de idioma seleccionado
    const languageId = selectedLanguage.value.id; // ID del idioma destino
    const fullNameLanguage = selectedLanguage.value.name; // Nombre del idioma

    console.log("Generando traducción translated: ", languageId);
    console.log("Generando traducción para fullNameLanguage: ", fullNameLanguage);

    // Enviar JSON al backend
    const serverResponse = await translatorService.translatedJson(jsonDatalanguageSpanish, languageId, fullNameLanguage);

    if (serverResponse) {
      alert(`Traducción generada para ${fullNameLanguage}`);
    } else {
      alert("Error al generar la traducción.");
    }

  } catch (error) {
    console.error("Error al generar traducción:", error);
    alert("Hubo un error al procesar la solicitud.");
  }
};


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
      const translatedJson = await translatorService.translatedJson(jsonData, JSON.parse(localStorage.getItem("langToTransale")), JSON.parse(localStorage.getItem("nameLang")));


      // convierte el objeto traducido en texto JSON bien formateado.
      const blob = new Blob([JSON.stringify(translatedJson, null, 2)], {type: "application/json"});
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
  localStorage.setItem("nameLang", JSON.stringify(language.name));

  // Recuperamos el objeto desde localStorage y lo parseamos
  const getLocalLanguage = JSON.parse(localStorage.getItem("langToTransale"));

  // Ahora podemos acceder correctamente a `id` y `name`
  // console.log("Idioma guardado en localStorage:", getLocalLanguage);
};

const getAllLanguages = async () => {
  try {
    const allLanguages = await translatorService.getLanguages();
    // Asignamos los objetos Lenguaje completos a la lista
    // TODO tengo que hacer una lista de lo idiomas que tengo en el servidor
    // TODO hacer una peticion al servidor para obtener los idiomas disponibles de mongo
    languages.value = allLanguages;
    filteredLanguages.value = allLanguages;

  } catch (error) {
    console.error("Error al obtener los idiomas del servidor: ", error);
  }
};

const filterLanguages = (val, update) => {
  // val → Es el texto que el usuario escribe en el q-select para buscar un idioma.
  if (val === "") { // Si el campo de búsqueda está vacío, mostramos todos los idiomas.
    update(() => {
      filteredLanguages.value = languages.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    filteredLanguages.value = languages.value.filter((lang) =>
      lang.name.toLowerCase().includes(needle)
    );
  });
};

const columns = [
  {name: "id", label: "ID del Idioma", field: "id", align: "left"},
  {name: "nameLang", label: "Nombre del Idioma", field: "nameLang", align: "left"},
  {name: "actions", label: "Acciones", field: "actions", align: "center"}
];
const deleteLanguage = async (id) => {
  // Evitar la eliminación de español e inglés
  if (id === "es" || id === "en") {
    alert(`El idioma ${id.toUpperCase()} no puede ser eliminado.`);
    return;
  }
  if (confirm(`¿Estás seguro de eliminar el idioma con ID ${id}?`)) {
    try {
      await translatorService.deleteLanguage(id);
      languagesAvailable.value = languagesAvailable.value.filter(lang => lang.id !== id);
    } catch (error) {
      console.error("Error al eliminar el idioma:", error);
      alert("Hubo un error al eliminar el idioma.");
    }
  }
};

const editLanguage = async (id) => {
  try {
    const languageData = await translatorService.getLanguage(id);
    editLanguageData.value = {
      id: languageData.language,
      nameLang: languageData.name,
      translations: JSON.stringify(languageData.translations, null, 2) // Json.stringify convierte un objeto JavaScript en una cadena de texto en formato JSON. Sirve para mostrarlo en un textarea.
    };
    editDialog.value = true;
  } catch (error) {
    console.error("Error al obtener idioma para edición:", error);
  }
};

const saveLanguageEdit = async () => {
  try {
    const updatedData = {
      id: editLanguageData.value.id,
      nameLang: editLanguageData.value.nameLang,
      translations: JSON.parse(editLanguageData.value.translations) // Asegura que es JSON válido
    };
    await translatorService.updateLanguage(updatedData);
    editDialog.value = false;
    getAllLanguagesAvailable(); // Recargar la lista después de actualizar
    window.location.reload()
  } catch (error) {
    console.error("Error al guardar el idioma editado:", error);
  }
};



async function handleFileUploadEs(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("Por favor, selecciona un archivo JSON.");
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = async function () {
    try {
      const jsonData = JSON.parse(reader.result);

      // Añadimos el ID y nombre del idioma
      const dataToUpload = {
        language: "es", // ID en MongoDB
        name: "Español",
        translations: jsonData
      };

      // Enviar datos al backend
      const response = await translatorService.uploadJsonEs(dataToUpload);

      if (response !== null) {
        await getAllLanguagesAvailable();
        alert("Plantilla de español subida con éxito.");
      } else {
        alert("Hubo un problema al subir la plantilla.");
      }


    } catch (error) {
      console.error("Error al subir el JSON:", error);
      alert("Hubo un error al procesar el archivo JSON.");
    }
  };

  reader.onerror = function () {
    alert("Error al leer el archivo JSON.");
  };
}

function triggerFileInput() {
  document.getElementById("fileUploaderEs").click();
}


onMounted(async () => {
  await getAllLanguages();
  await getAllLanguagesAvailable();
});
</script>

<template>

  <div class="text-center">
    <h1 class="text-primary">{{ $t('hello') }}</h1>
    <p class="text-grey-8">{{ $t('welcome') }}</p>
  </div>


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

      <q-card class="col-xs-12 col-sm-5 col-md-3 q-pa-md">
        <q-card-section class="text-center">
      <q-btn
        color="secondary"
        unelevated
        icon="download"
        class="q-mt-md"
        @click="downloadTranslationBase"
      >
        Descargar Plantilla (ES)
      </q-btn>

      <q-btn
        color="secondary"
        unelevated
        class="q-mt-md"
        icon="cloud_upload"
        @click="triggerFileInput"
      >
        Subir Plantilla (ES)
      </q-btn>

      <input
        type="file"
        ref="fileInput"
        id="fileUploaderEs"
        accept=".json"
        style="display: none"
        @change="handleFileUploadEs"
      />

        </q-card-section>
      </q-card>

      <q-page padding>
        <q-table
          :rows="languagesAvailable"
          :columns="columns"
          row-key="id"
          title="Idiomas Disponibles en MongoDB"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                color="green"
                icon="g_translate"
                dense
                flat
                @click="changeLanguage(props.row.id)"
              >

              </q-btn>

              <q-btn
                color="blue"
                icon="edit"
                dense
                flat
                @click="editLanguage(props.row.id)"
              />
              <q-btn
                color="red"
                icon="delete"
                dense
                flat
                @click="deleteLanguage(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>

        <!-- Modal para edición -->
        <q-dialog v-model="editDialog" persistent maximized>
          <q-card>
            <q-card-section>
              <div class="text-h6">Editar Idioma</div>
            </q-card-section>

            <q-card-section>
              <q-input v-model="editLanguageData.nameLang" label="Nombre del Idioma" readonly/>
              <q-input v-model="editLanguageData.translations"
                       label="JSON de Traducciones"
                       type="textarea"
                       filled
                       standout
                       autogrow
                       class="q-mt-md"
                       style="flex-grow: 1; height: 100%; font-family: monospace; white-space: pre; overflow: auto;"/>
            </q-card-section>

            <q-card-actions align="right"
                            class="bg-grey-2 q-pa-md"
                            style="position: sticky; bottom: 0; width: 100%; z-index: 1000;">
              <q-btn flat label="Cancelar" v-close-popup/>
              <q-btn color="primary" label="Guardar" @click="saveLanguageEdit"/>
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-page>


      <!-- Selector de idioma -->
      <q-select
        v-model="selectedLanguage"
        :options="filteredLanguages"
        option-value="id"
        option-label="name"
        use-input
        input-debounce="0"
        @filter="filterLanguages"
        :label="t('mainLayout.selectLanguage')"
        dense
        outlined
        class="q-mb-md"
        style="width: 250px"
        behavior="menu"
        @update:model-value="saveSelectedLanguage"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- BOTÓN PARA GENERAR TRADUCCIÓN -->
      <q-btn
        color="primary"
        class="q-mt-md"
        label="Generar Traducción"
        @click="generateTranslation"
        :disable="!selectedLanguage"
      />


    </div>
  </div>


</template>
