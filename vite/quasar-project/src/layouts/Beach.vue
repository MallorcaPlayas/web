<script setup>
import {ref} from 'vue';

import HeaderAndDrawer from "components/HeaderAndDrawer.vue";
import CrudTable from "components/CrudTable.vue";

const rows = ref([
  {
    id: 1,
    nombre: 'Playa del Sol',
    municipio: 'Málaga',
    descripcion: 'Playa amplia con arena dorada y vistas impresionantes.',
    tipoPlaya: ['Familiar', 'Surf'],
    servicios: ['Duchas', 'Socorristas', 'Chiringuitos'],
    fotos: ['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'],
    urlCamaraWeb: 'https://example.com/camara1',
    ubicacion: { lat: 36.7213, lon: -4.4217 },
    empresaSocorrista: 'Safe Beach Co.',
    denuncias: 2,
    paginaWeb: 'https://playadelsol.com',
    anuncios: ['Descuento en sombrillas', 'Fiesta de verano'],
    selected: false,
  },
  {
    id: 2,
    nombre: 'Playa Verde',
    municipio: 'Almería',
    descripcion: 'Pequeña playa tranquila rodeada de naturaleza.',
    tipoPlaya: ['Naturista', 'Relax'],
    servicios: ['Duchas', 'Aparcamiento'],
    fotos: ['https://example.com/foto3.jpg'],
    urlCamaraWeb: 'https://example.com/camara2',
    ubicacion: { lat: 36.8416, lon: -2.4637 },
    empresaSocorrista: 'Beach Rescue Ltd.',
    denuncias: 0,
    paginaWeb: 'https://playaverde.com',
    anuncios: ['Yoga en la playa cada domingo'],
    selected: false,
  },
]);

const columns = [
  {
    name: 'select',
    label: 'Select',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    sortable: true
  },
  {
    name: 'nombre',
    label: 'Nombre',
    field: 'nombre',
    sortable: true
  },
  {
    name: 'municipio',
    label: 'Municipio',
    field: 'municipio',
    sortable: true
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    field: 'descripcion',
    sortable: false
  },
  {
    name: 'tipoPlaya',
    label: 'Tipo de Playa',
    field: 'tipoPlaya', // Se espera que sea un array
    // format: val => val.join(', '), // Convierte el array en una lista separada por comas
    sortable: false
  },
  {
    name: 'servicios',
    label: 'Servicios',
    field: 'servicios', // Se espera que sea un array
    // format: val => val.join(', '), // Convierte el array en una lista separada por comas
    sortable: false
  },
  {
    name: 'fotos',
    label: 'Fotos',
    field: 'fotos', // Se espera que sea una URL o un array de URLs
    // format: val => val.length ? `${val.length} foto(s)` : 'No hay fotos',
    sortable: false
  },
  {
    name: 'urlCamaraWeb',
    label: 'Cámara Web',
    field: 'urlCamaraWeb', // Se espera que sea una URL
    // format: val => val ? `<a href="${val}" target="_blank">Ver Cámara</a>` : 'Sin cámara',
    sortable: false
  },
  {
    name: 'ubicacion',
    label: 'Ubicación',
    field: 'ubicacion', // Se espera que sea un objeto con latitud y longitud
    // format: val => `Lat: ${val.lat}, Lon: ${val.lon}`, // Muestra la ubicación en formato legible
    sortable: false
  },
  {
    name: 'empresaSocorrista',
    label: 'Empresa Socorrista',
    field: 'empresaSocorrista',
    sortable: true
  },
  {
    name: 'denuncias',
    label: 'Denuncias',
    field: 'denuncias', // Se espera que sea un número
    sortable: true
  },
  {
    name: 'paginaWeb',
    label: 'Página Web',
    field: 'paginaWeb', // Se espera que sea una URL
    // format: val => val ? `<a href="${val}" target="_blank">Ver Página</a>` : 'Sin página web',
    sortable: false
  },
  {
    name: 'anuncios',
    label: 'Anuncios',
    field: 'anuncios', // Se espera que sea un array
    // format: val => val.length ? `${val.length} anuncio(s)` : 'Sin anuncios',
    sortable: false
  },
  {
    name: 'accion',
    label: 'Acción',
    align: 'center',
    field: 'accion',
    sortable: false
  }
];


const selectAll = ref(false);

function openAddBeachDialog() {
  console.log('Abriendo modal para agregar playa...');
}

function editBeach(row) {
  console.log('Editando playa:', row);
}

function confirmDeleteBeach(row) {
  console.log('Confirmar eliminación de playa:', row);
}

function deleteSelectedBeaches() {
  console.log('Eliminando playas seleccionadas...');
}

// Define las acciones para el CRUD
const beachActions = {
  openAddDialog: openAddBeachDialog,
  edit: editBeach,
  confirmDelete: confirmDeleteBeach,
  deleteSelected: deleteSelectedBeaches,
};
</script>

<template>

  <q-layout view="lHh Lpr lFf">
    <HeaderAndDrawer/>

    <CrudTable
      title="Playa"
      :rows="rows"
      :columns="columns"
      :actions="beachActions"
      @edit-row="editUser"
      @delete-row="confirmDeleteUser"
    />
  </q-layout>


</template>
