<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {onMounted, ref} from "vue";
import {BeachService} from "src/service/BeachService.js";
import {RouteService} from "src/service/RouteService.js";

const routeService = new RouteService()

const rows = ref([]);


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
  // {
  //   name: 'descripcion',
  //   label: 'Descripción',
  //   rules: [val => !!val || 'Campo obligatorio'],
  //   type: 'textarea', // Campo tipo texto largo para descripciones
  // },
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
  {
    name: 'distance',
    label: 'Distancia (km)',
    rules: [
      val => !!val || 'Campo obligatorio',
      val => !isNaN(val) || 'Debe ser un número válido',
    ],
    type: 'number', // Campo para ingresar la distancia en kilómetros
  },
  {
    name: 'duration',
    label: 'Duracion (min)',
    rules: [
      val => !!val || 'Campo obligatorio',
      val => !isNaN(val) || 'Debe ser un número válido',
    ],
    type: 'number', // Campo para ingresar la distancia en kilómetros
  },
  {
    name: 'elevation',
    label: 'Desnivel (m)',
    rules: [
      val => !!val || 'Campo obligatorio',
      val => !isNaN(val) || 'Debe ser un número válido',
    ],
    type: 'number', // Campo para ingresar el desnivel en metros
  },
  // {
  //   name: 'valoracion',
  //   label: 'Valoración',
  //   rules: [
  //     val => !!val || 'Campo obligatorio',
  //     val => val >= 0 && val <= 5 || 'Debe ser un número entre 0 y 5',
  //   ],
  //   type: 'number', // Campo para la valoración de la ruta
  // },
  // {
  //   name: 'tipoRuta',
  //   label: 'Tipo de Ruta',
  //   options: ['Senderismo', 'Ciclismo', 'Trail Running'], // Opciones de tipo de ruta
  //   type: 'select',
  //   rules: [val => !!val || 'Seleccione al menos un tipo de ruta'],
  // },
  // {
  //   name: 'dificultad',
  //   label: 'Dificultad',
  //   options: ['Fácil', 'Intermedia', 'Difícil', 'Solo Expertos'], // Opciones de dificultad
  //   type: 'select',
  //   rules: [val => !!val || 'Seleccione la dificultad de la ruta'],
  // },
  // {
  //   name: 'denuncias',
  //   label: 'Número de Denuncias',
  //   rules: [
  //     val => (val !== null && val !== '' && !isNaN(parseInt(val))) || 'Por favor introduce un número',
  //     val => val >= 0 || 'Debe ser un número positivo o cero',
  //   ],
  //   type: 'number', // Campo para las denuncias registradas
  // },
  {
    name: 'private',
    label: 'Privada',
    field: 'private',
  },
  {
    name: 'estado',
    label: 'Estado de la Ruta',
    type: 'toggle', // Permite habilitar o deshabilitar la ruta
  },
];


const routeColumns = [
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
    label: 'Nombre de Ruta',
    align: 'left',
    field: 'name',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'zona',
    label: 'Zona',
    align: 'left',
    field: 'zona',
    sortable: true,
    columnaVisible: true // Representa la región o ubicación de la ruta
  },
  {
    name: 'paginaWeb',
    label: 'Página Web',
    align: 'left',
    field: 'paginaWeb',
    sortable: false,
    columnaVisible: true,
    format: val => val ? `<a href="${val}" target="_blank">Ver Página</a>` : 'Sin página web' // Permite acceder a la página web de la ruta
  },
  {
    name: 'fotos',
    label: 'Fotos',
    field: 'fotos',
    align: 'center',
    format: val => val.length ? `${val.length} foto(s)` : 'No hay fotos',
    sortable: false,
    columnaVisible: true // Muestra la cantidad de fotos disponibles
  },
  {
    name: 'descripcion',
    label: 'Descripción',
    align: 'left',
    field: 'descripcion',
    sortable: false,
    columnaVisible: true // Breve descripción de la ruta
  },
  // {
  //   name: 'denuncias',
  //   label: 'Denuncias',
  //   align: 'center',
  //   field: 'denuncias',
  //   sortable: true,
  //   columnaVisible: true // Número de denuncias asociadas a la ruta
  // },
  {
    name: 'distance',
    label: 'Distancia',
    align: 'center',
    field: 'distance',
    sortable: true,
    columnaVisible: true, // Distancia total de la ruta
    format: val => `${val} km` // Formato para mostrar distancia
  },
  {
    name: 'duration',
    label: 'Desnivel',
    align: 'center',
    field: 'duration',
    sortable: true,
    columnaVisible: true, // Desnivel de la ruta
    format: val => `${val} m` // Formato para mostrar el desnivel
  },
  {
    name: 'elevation',
    label: 'Desnivel',
    align: 'center',
    field: 'elevation',
    sortable: true,
    columnaVisible: true, // Desnivel de la ruta
    format: val => `${val} m` // Formato para mostrar el desnivel
  },
  {
    name: 'valoracion',
    label: 'Valoración',
    align: 'center',
    field: 'valoracion',
    sortable: true,
    columnaVisible: true, // Valoración promedio de la ruta
    format: val => `${val} / 5` // Formato para mostrar la valoración
  },
  {
    name: 'private',
    label: 'Privada',
    align: 'center',
    field: 'private',
    sortable: true,
    columnaVisible: true
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

  const routesData = await routeService.getAll()
  console.log('routesData', routesData)
  rows.value = routesData.map(route => ({
    id: route.id,
    name: route.name,
    //municipio: 'Almería',
    distance: route.distance,
    duration: route.duration,
    elevation: route.elevation,
    //fotos: beach.photos,
    private: route.private,
    selected: false,
  }));
})

const saveNewRoute = (newRoute) => {
  routeService.create(newRoute)
};

const saveEditRoutes = (route) => {
  routeService.update(route)
}

const deleteRoute = (route) => {
  routeService.delete(route.id)
}


</script>

<template>
  <ManagerGeneral
    title="Ruta"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="routeColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewRoute"
    @saveFormularioEdit="saveEditRoutes"
    @eliminarRegistro="deleteRoute"
  />
</template>
