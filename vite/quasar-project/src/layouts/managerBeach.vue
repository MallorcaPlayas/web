<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import beachService from 'src/service/beachService.js';
import {ref} from "vue";

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
    ubicacion: {lat: 36.7213, lon: -4.4217},
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
    ubicacion: {lat: 36.8416, lon: -2.4637},
    empresaSocorrista: 'Beach Rescue Ltd.',
    denuncias: 0,
    paginaWeb: 'https://playaverde.com',
    anuncios: ['Yoga en la playa cada domingo'],
    selected: false,
  },
]);

const fieldsFormulario = [
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
    rules: [
      val => (val !== null && val !== '' && parseInt(val) != NaN) || 'Por favor introduce un número',
      val => val >= 0 || 'Debe ser un número positivo o cero',
    ],
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
    format: val => val.join(', '), // Convierte el array en una lista separada por comas
    sortable: false
  },
  {
    name: 'servicios',
    label: 'Servicios',
    field: 'servicios', // Se espera que sea un array
    format: val => val.join(', '), // Convierte el array en una lista separada por comas
    sortable: false
  },
  {
    name: 'fotos',
    label: 'Fotos',
    field: 'fotos', // Se espera que sea una URL o un array de URLs
    format: val => val.length ? `${val.length} foto(s)` : 'No hay fotos',
    sortable: false
  },
  {
    name: 'urlCamaraWeb',
    label: 'Cámara Web',
    field: 'urlCamaraWeb', // Se espera que sea una URL
    format: val => val ? `<a href="${val}" target="_blank">Ver Cámara</a>` : 'Sin cámara',
    sortable: false
  },
  {
    name: 'ubicacion',
    label: 'Ubicación',
    field: 'ubicacion', // Se espera que sea un objeto con latitud y longitud
    format: val => `Lat: ${val.lat}, Lon: ${val.lon}`, // Muestra la ubicación en formato legible
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
    format: val => val ? `<a href="${val}" target="_blank">Ver Página</a>` : 'Sin página web',
    sortable: false
  },
  {
    name: 'anuncios',
    label: 'Anuncios',
    field: 'anuncios', // Se espera que sea un array
    format: val => val.length ? `${val.length} anuncio(s)` : 'Sin anuncios',
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

const saveNewBeach = (newBeach) => {
  console.log("Objeto recibido del emit saveFormularioAdd:", newBeach);
  rows.value.push(newBeach);

};

const saveEditBeach = (beach) => {
  console.log("Objeto recibido en saveEditUser:", beach);
  const index = rows.value.findIndex(row => row.id === beach.id);
  if (index !== -1) {
    rows.value[index] = beach;
  } else {
    console.warn("No se encontró la playa a editar.");
  }
}

  const deleteBeach = (beach) => {
    console.log("Objeto recibido en deleteUser:", beach);
    const index = rows.value.findIndex(row => row.id === beach.id);
    if (index !== -1) {
      rows.value.splice(index, 1);
    } else {
      console.warn("No se encontró la playa a eliminar");

    }

  }


</script>

<template>
  <ManagerGeneral
    title="Playa"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="beachColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewBeach"
    @saveFormularioEdit="saveEditBeach"
    @eliminarRegistro="deleteBeach"
  />
</template>
