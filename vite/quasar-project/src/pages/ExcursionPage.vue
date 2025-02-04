<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {onMounted, ref} from "vue";
import {BeachService} from "src/service/BeachService.js";
import {RouteService} from "src/service/RouteService.js";
import {ExcursionService} from "src/service/ExcursionService.js";

const excursionService = new ExcursionService()
const routeService = new RouteService()

const rows = ref([]);
const routes = ref([])


const fieldsFormulario = [
  {
    name: 'name',
    label: 'Nombre de la Ruta',
    rules: [val => !!val || 'Campo obligatorio'],
  },
  // {
  //   name: 'zona',
  //   label: 'Zona',
  //   rules: [val => !!val || 'Campo obligatorio'],
  // },
  {
    name: 'description',
    label: 'Descripción',
    rules: [val => !!val || 'Campo obligatorio'],
    type: 'textarea', // Campo tipo texto largo para descripciones
  },
  // {
  //   name: 'paginaWeb',
  //   label: 'Página Web (URL)',
  //   rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
  //   type: 'url', // Campo de tipo URL
  // },
  // {
  //   name: 'fotos',
  //   label: 'URLs de Fotos',
  //   // rules: [val => val && Array.isArray(val) || 'Debe ser una lista de URLs válidas'],
  //   type: 'text', // Campo para ingresar las URLs de las fotos
  // },
  // {
  //   name: 'valoracion',
  //   label: 'Valoración',
  //   rules: [
  //     val => !!val || 'Campo obligatorio',
  //     val => val >= 0 && val <= 5 || 'Debe ser un número entre 0 y 5',
  //   ],
  //   type: 'number', // Campo para la valoración de la ruta
  // },
  {
    name: 'estado',
    label: 'Estado de la Ruta',
    type: 'toggle', // Permite habilitar o deshabilitar la ruta
  },
];


const excursionColumns = [
  {
    name: 'select',
    label: 'Seleccionar',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    sortable: true,
    noMostrarID: false // Permite ocultar el ID si es necesario
  },
  {
    name: 'name',
    label: 'Nombre',
    align: 'left',
    field: 'name',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'description',
    label: 'Descripcion',
    align: 'left',
    field: 'description',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'excursionTicketDetails',
    label: 'Excursiones con tickets definidos',
    align: 'left',
    field: 'excursionTicketDetails',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'route',
    label: 'Ruta',
    align: 'left',
    field: 'route',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'user',
    label: 'Usuario',
    align: 'left',
    field: 'user',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'accion',
    label: 'Acción',
    align: 'center',
    field: 'accion',
    sortable: false,
    columnaVisible: true // Botones de acción (editar/eliminar)
  }
];


onMounted(async () => {
  routes.value = await routeService.getAll()
  const excursionsData = await excursionService.getAll()

  console.log("COMPONENT VUE" , excursionsData)
  rows.value = excursionsData.map(excursion => ({
    id: excursion.id,
    //name: excursion.name,
    //municipio: 'Almería',
    description: excursion.description,
    excursionTicketDetails: excursion.excursionTicketDetails.price,
    route: excursion.route,
    user: excursion.user,
    selected: false,
  }));
})

const saveNewExcursion = (newExcursion) => {
  excursionService.create(newExcursion)
};

const saveEditExcursion = (excursion) => {
  excursionService.update(excursion)
}

const deleteExcursion = (excursion) => {
  excursionService.delete(excursion.id)
}


</script>

<template>
  <ManagerGeneral
    title="Excursiones"
    :fieldsForm="fieldsFormulario"
    :columns="excursionColumns"
    :rows="rows"
    @saveFormularioAdd="saveNewExcursion"
    @saveFormularioEdit="saveEditExcursion"
    @eliminarRegistro="deleteExcursion"
  />
</template>
