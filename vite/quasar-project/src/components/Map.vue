<template>
  <div>
    <h1>Mapa de rutas</h1>
    <div id="map" style="height: 500px; width: 100%;"></div>

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


import { onMounted, ref, watch } from 'vue';

import { useQuasar } from 'quasar'
import axios from 'axios';
const $q = useQuasar();
// Declaramos `rutaCoordenadas` como `ref([])` para que sea reactiva y accesible en todo el script
const rutaCoordenadas = ref([]);

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


const props = defineProps({
  objectLocation: {
    type: Array,
    required: false, // Los datos de la ubicación
  },

});



// const rutaCoordenadas = [
//   { lat: 39.7131, lng: 3.4581 }, // Cala Ratjada
//   { lat: 39.6846, lng: 3.3514 }, // Artà
//   { lat: 39.6328, lng: 3.2062 }, // Manacor
//   { lat: 39.6064, lng: 3.0621 }, // Montuïri
//   { lat: 39.5673, lng: 2.9043 }, // Algaida
//   { lat: 39.5695, lng: 2.7304 }, // Marratxí
//   { lat: 39.5696, lng: 2.6502 }, // Palma
// ];

const initMap = () => {
  const ubicacion = { lat: 39.695263, lng: 3.017571 };

  const mapa = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: ubicacion,
  });

  const marcador = new google.maps.Marker({
    position: ubicacion,
    map: mapa,
  });

  dibujarRuta(mapa);
  centrarMapaEnRuta(mapa, rutaCoordenadas.value);
};

const dibujarRuta = (mapa) => {
  console.log("ruta cordenada que vale: ",rutaCoordenadas.value)
  const ruta = new google.maps.Polyline({
    path: rutaCoordenadas.value,
    geodesic: true,
    strokeColor: '#47ff00',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  ruta.setMap(mapa);
};

const centrarMapaEnRuta = (mapa, coordenadas) => {
  const limites = new google.maps.LatLngBounds();

  coordenadas.forEach((punto) => {
    limites.extend(new google.maps.LatLng(punto.lat, punto.lng));
  });

  mapa.fitBounds(limites);
};



watch(() => props.objectLocation, (newVal) => {
  console.log("Que es????? ", newVal[0]);

  if (newVal && newVal.length > 0 && newVal[0].locations) {
    rutaCoordenadas.value = newVal[0].locations.map((punto) => ({
      lat: punto.latitude,
      lng: punto.longitude,
    }));
  }

  console.log("esta dentro del watch :" , rutaCoordenadas.value)
}, { deep: true, immediate: true });

onMounted(() => {
  // console.log("Coger la api key de Google Maps ", process.env.GOOGLE_MAPS_API_KEY)

  // Carga dinámica de la API de Google Maps
  const script = document.createElement('script');
  // TODO poner la APIKEY en un archivo de desarrollo
  // TODO poner la aPIKEY de Google Maps de JOAN. Tengo que decirle cual es mi dominio
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  script.defer = true;
  window.initMap = initMap; // Necesario para que Google Maps llame a la función
  document.head.appendChild(script);
});
</script>
