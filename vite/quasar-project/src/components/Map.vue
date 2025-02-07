<template>

  <GoogleMap
      :api-key="apiKey"
      style="width: 100%; height: 500px"
      :center="initLocation"
      :zoom="12"
  >
    <Polyline :options="{
      path: lonLng,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0
    }"/>
  </GoogleMap>
  <div>


    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-uploader
            style="max-width: 300px"
            label="Subir archivo GPX"
            accept=".gpx"
            @added="onFileAdded"
            :auto-upload="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import axios from 'axios';
import {GoogleMap , Polyline} from "vue3-google-map";
import {onMounted, ref} from "vue";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const props = defineProps({
  locations: {
    type: Array,
    required: false,
  },
});

const lonLng = ref([]);
const initLocation = ref({});
const $q = useQuasar();

const onFileAdded = async (files) => {
  if (files.length === 0) return;

  const file = files[0];

  // Crear los datos de la ruta
  const createRouteDto = {
    name: "Ruta Ejemplo",
    description: "Esta es una descripción de prueba",
    distance: 15.4,
  };

  // Crear el FormData
  const formData = new FormData();
  formData.append(
      "entity",
      new Blob([JSON.stringify(createRouteDto)], { type: "application/json" }) // Especificar explícitamente que es JSON
  );
  formData.append("gpxFile", file);

  try {
    const response = await axios.post(
        "http://127.0.0.1:8080/api/routes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
    );

    $q.notify({
      type: "positive",
      message: "Archivo subido y procesado correctamente",
    });

    if (response.data && response.data.locations) {
      rutaCoordenadas.value = response.data.locations.map((punto) => ({
        lat: punto.latitude,
        lng: punto.longitude,
      }));
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: `Error al subir el archivo: ${error.message}`,
    });
    console.error("Error al subir archivo:", error);
  }
};

onMounted(async()=>{
  lonLng.value = props.locations.map(location => {
    return { lat: location.latitude , lng: location.longitude }
  });

  console.log("dentro del objeto map: ",lonLng.value);

  initLocation.value = lonLng.value.at(0);
})

</script>

