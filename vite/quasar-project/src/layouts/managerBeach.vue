<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {BeachService} from 'src/service/BeachService.js';
import {TypeBeachService} from 'src/service/TypeBeachService.js';
import {onMounted, ref} from "vue";
import {ServiceBeachService} from "src/service/ServiceBeachService.js";

const beachService = new BeachService()
const typeBeachService = new TypeBeachService()
const serviceBeachService = new ServiceBeachService()
const rows = ref([]);
const types = ref();
const services = ref();

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
    options: () => types.value, // Opciones estáticas
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos un tipo de playa'],
    multiple: true, // Permite seleccionar múltiples opciones
  },
  {
    name: 'servicios',
    label: 'Servicios Disponibles',
    options: () => services.value, // Opciones de servicios
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos un servicio'],
    multiple: true, // Permite múltiples selecciones
  },
  // {
  //   name: 'fotos',
  //   label: 'URLs de Fotos',
  //   rules: [val => val && Array.isArray(val) || 'Debe ser una lista de URLs válidas'],
  //   type: 'text',
  // },
  {
    name: 'urlCamaraWeb',
    label: 'Cámara Web (URL)',
    rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
    type: 'url',
  },
  // {
  //   name: 'empresaSocorrista',
  //   label: 'Empresa de Socorrismo',
  //   rules: [val => !!val || 'Campo obligatorio'],
  // },
  // {
  //   name: 'denuncias',
  //   label: 'Número de Denuncias',
  //   rules: [
  //     val => (val !== null && val !== '' && parseInt(val) != NaN) || 'Por favor introduce un número',
  //     val => val >= 0 || 'Debe ser un número positivo o cero',
  //   ],
  //   type: 'number',
  // },
  // {
  //   name: 'paginaWeb',
  //   label: 'Página Web (URL)',
  //   rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
  //   type: 'url',
  // },
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
    sortable: true,
    noMostrarID: false
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
    format: (val) => val.map((type) => type.name).join(', '),
    sortable: false
  },
  {
    name: 'servicios',
    label: 'Servicios',
    field: 'servicios', // Se espera que sea un array
    format: (val) => val.map((service) => service.serviceBeach.name).join(', '),
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
  // {
  //   name: 'empresaSocorrista',
  //   label: 'Empresa Socorrista',
  //   field: 'empresaSocorrista',
  //   sortable: true
  // },
  // {
  //   name: 'denuncias',
  //   label: 'Denuncias',
  //   field: 'denuncias', // Se espera que sea un número
  //   sortable: true
  // },
  // {
  //   name: 'paginaWeb',
  //   label: 'Página Web',
  //   field: 'paginaWeb', // Se espera que sea una URL
  //   format: val => val ? `<a href="${val}" target="_blank">Ver Página</a>` : 'Sin página web',
  //   sortable: false
  // },
  {
    name: 'accion',
    label: 'Acción',
    align: 'center',
    field: 'accion',
    sortable: false
  }
];

onMounted(async () => {
  const beachesData = await beachService.getAll()
  const typesData = await typeBeachService.getAll()
  const servicesData = await serviceBeachService.getAll()
  types.value = typesData
  services.value = servicesData

  console.log(beachesData)


  rows.value = beachesData.map(beach => ({
    id: 2,
    nombre: beach.name,
    //municipio: 'Almería',
    descripcion: beach.description,
    tipoPlaya: beach.types,
    servicios: beach.services,
    //fotos: beach.photos,
    urlCamaraWeb: beach.cameras,
    selected: false,

  }));
})

const saveNewBeach = (newBeach) => {
  console.log("Objeto recibido del emit saveFormularioAdd:", newBeach);
  beachService.create(newBeach);

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
