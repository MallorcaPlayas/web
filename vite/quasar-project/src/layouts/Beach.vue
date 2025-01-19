<script setup>
import {ref} from 'vue';

import HeaderAndDrawer from "components/HeaderAndDrawer.vue";
import CrudTable from "components/CrudTable.vue";
import Formulario from "components/Formulario.vue";
import {serviceUser} from "src/service/serviceUser.js";

const formDataBeach = ref({}); // NUEVO: Datos del formulario. Con {} estoy creando un objeto vacio
const dialogMode = ref('add'); // NUEVO: Modo del modal ('add' o 'edit')
const dialogOpen = ref(false); // NUEVO: Estado del modal
const selectedBeach = ref(null); // Beach seleccionado para eliminar
const confirmDialogOpen = ref(false); // Estado para abrir/cerrar el diálogo cuando borro a un usuario
const confirmAction = ref(''); // Acción seleccionada (desactivar, banear, eliminar)


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


const saveBeach = () => {
  console.log("Guardando playa...");

  if (dialogMode.value === 'add') {
    const newBeach = {
      id: rows.value.length + 1, // Generar un ID único basado en la longitud actual del array
      nombre: formDataBeach.value.nombre,
      municipio: formDataBeach.value.municipio,
      descripcion: formDataBeach.value.descripcion,
      tipoPlaya: formDataBeach.value.tipoPlaya, // Array con tipos de playa
      servicios: formDataBeach.value.servicios, // Array con servicios
      fotos: formDataBeach.value.fotos, // Array de URLs de fotos
      urlCamaraWeb: formDataBeach.value.urlCamaraWeb,
      ubicacion: formDataBeach.value.ubicacion, // Objeto con latitud y longitud
      empresaSocorrista: formDataBeach.value.empresaSocorrista,
      denuncias: formDataBeach.value.denuncias,
      paginaWeb: formDataBeach.value.paginaWeb,
      anuncios: formDataBeach.value.anuncios, // Array con anuncios
      estado: formDataBeach.value.estado,
      selected: false, // Inicializamos selected como falso
    };

    // Añadir la nueva playa al array de filas
    rows.value.push(newBeach);

    console.log('Nueva playa añadida:', newBeach);

  } else {
    const index = rows.value.findIndex(row => row.id === formDataBeach.value.id);
    if (index !== -1) {
      rows.value[index] = { ...formDataBeach.value }; // Actualizamos los datos de la playa
      console.log('Playa actualizada:', rows.value[index]);
    }
  }

  dialogOpen.value = false; // Cerramos el diálogo
};


const closeDialog = () => {
  dialogOpen.value = false;
};
const selectAll = ref(false);

function openAddBeachDialog() {
  console.log('Abriendo modal para agregar playa...');
}



// Función para abrir el diálogo de confirmación al eliminar un usuario
const confirmDeleteBeach = (user) => {
  selectedBeach.value = user; // Guarda el usuario seleccionado
  confirmDialogOpen.value = true; // Abre el diálogo
  confirmAction.value = ''; // Limpia la acción seleccionada previamente
};



function deleteSelectedBeaches() {
  console.log('Eliminando playas seleccionadas...');
}

// Define las acciones para el CRUD
const beachActions = {
  openAddDialog: openAddBeachDialog,
  deleteSelected: deleteSelectedBeaches,
};

const editBeach = (row) => {
  console.log("paso por aqui? estoy editando una playa")
  formDataBeach.value = {...row}; // Copiar datos del usuario
  dialogMode.value = 'edit';
  dialogOpen.value = true;
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
      @edit-row="editBeach"
      @delete-row="confirmDeleteBeach"
    />
  </q-layout>

  <q-dialog v-model="dialogOpen" full-width>
    <Formulario
      :formData="formDataBeach"
      :fields="beachFields"
      :isEdit="dialogMode === 'edit'"
      title="Playa"
      @saveFormulario="saveBeach"
      @cancelFormulario="closeDialog"
    />
  </q-dialog>


</template>
