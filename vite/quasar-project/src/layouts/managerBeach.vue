<script setup>

import CrudTable from "components/CrudTable.vue";
import ManagerGeneral from "components/ManagerGeneral.vue";
import beachService from 'src/service/beachService.js';

const beachFields = [
  {
    name: 'nombre',
    label: 'Nombre de la Playa',
    rules: [val => !!val || 'Campo obligatorio'],
  },
  {
    name: 'municipio',
    label: 'Municipio',
    rules: [val => !!val || 'Campo obligatorio'],
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    rules: [val => !!val || 'Campo obligatorio'],
    type: 'textarea', // Puede ser tipo textarea para descripciones largas
  },
  {
    name: 'tipoPlaya',
    label: 'Tipo de Playa',
    options: ['Familiar', 'Surf', 'Naturista', 'Relax'], // Opciones estáticas
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos un tipo de playa'],
    multiple: true, // Permite seleccionar múltiples opciones
  },
  {
    name: 'servicios',
    label: 'Servicios Disponibles',
    options: ['Duchas', 'Socorristas', 'Chiringuitos', 'Aparcamiento'], // Opciones de servicios
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos un servicio'],
    multiple: true, // Permite múltiples selecciones
  },
  {
    name: 'fotos',
    label: 'URLs de Fotos',
    rules: [val => val && Array.isArray(val) || 'Debe ser una lista de URLs válidas'],
    type: 'text',
  },
  {
    name: 'urlCamaraWeb',
    label: 'Cámara Web (URL)',
    rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
    type: 'url',
  },
  {
    name: 'ubicacion',
    label: 'Ubicación (Latitud y Longitud)',
    rules: [val => !!val || 'Ingrese la ubicación de la playa'],
    type: 'text', // Podrías cambiar a un componente personalizado si usas mapas
  },
  {
    name: 'empresaSocorrista',
    label: 'Empresa de Socorrismo',
    rules: [val => !!val || 'Campo obligatorio'],
  },
  {
    name: 'denuncias',
    label: 'Número de Denuncias',
    rules: [val => typeof val === 'number' || 'Debe ser un número'],
    type: 'number',
  },
  {
    name: 'paginaWeb',
    label: 'Página Web (URL)',
    rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
    type: 'url',
  },
  {
    name: 'anuncios',
    label: 'Anuncios',
    rules: [val => val && Array.isArray(val) || 'Debe ser una lista de anuncios'],
    type: 'text',
  },
  {
    name: 'estado',
    label: 'Estado de la Playa',
    type: 'toggle',
  },
];

const beachColumns = [
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
</script>

<template>
  <ManagerGeneral
    title="Playa"
    :fields="beachFields"
    :columnsAA="beachColumns"
    :service="beachService"
  />
</template>
