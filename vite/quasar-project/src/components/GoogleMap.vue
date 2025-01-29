<template>
  <h1>JAJAJA</h1>
  <div>
    <h1>Mapa de Rutas</h1>
    <div id="map" style="height: 500px; width: 100%;"></div>
  </div>
</template>

<script setup>
console.log('Hola desde GoogleMap.vue');

const variableEntorno = import.meta.env.APIKEY;
console.log("Tengo el api key?", variableEntorno);

import { onMounted } from 'vue';

const rutaCoordenadas = [
  { lat: 39.7131, lng: 3.4581 }, // Cala Ratjada
  { lat: 39.6846, lng: 3.3514 }, // Artà
  { lat: 39.6328, lng: 3.2062 }, // Manacor
  { lat: 39.6064, lng: 3.0621 }, // Montuïri
  { lat: 39.5673, lng: 2.9043 }, // Algaida
  { lat: 39.5695, lng: 2.7304 }, // Marratxí
  { lat: 39.5696, lng: 2.6502 }, // Palma
];

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
  centrarMapaEnRuta(mapa, rutaCoordenadas);
};

const dibujarRuta = (mapa) => {
  const ruta = new google.maps.Polyline({
    path: rutaCoordenadas,
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

onMounted(() => {
  // Carga dinámica de la API de Google Maps
  const script = document.createElement('script');
  // TODO poner la APIKEY en un archivo de entorno
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCZ0gURPmhxevRYAQR26czw346EfZNX8wY&callback=initMap`;
  script.async = true;
  script.defer = true;
  window.initMap = initMap; // Necesario para que Google Maps llame a la función
  document.head.appendChild(script);
});
</script>
