<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";

import GoogleMap from "components/Map.vue";

import {onMounted, ref} from "vue";
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
  // {
  //   name: 'tipoRuta',
  //   label: 'Tipo de Ruta',
  //   options: ['Senderismo', 'Ciclismo', 'Trail Running'], // Opciones de tipo de ruta
  //   type: 'select',
  //   rules: [val => !!val || 'Seleccione al menos un tipo de ruta'],
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
    name: 'localizacion',
    label: 'Localización',
    align: 'left',
    field: 'zona',
    sortable: true,
    columnaVisible: true // Representa la región o ubicación de la ruta
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
    name: 'map',
    label: 'Mapa',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
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

import {Location} from "src/model/route/Location.js";

onMounted(async () => {

  const routesData = await routeService.getAll()

  rows.value = routesData.map(route => ({
    id: route.id,
    name: route.name,
    map: route.locations,
    //municipio: 'Almería',
    distance: route.distance,
    duration: route.duration,
    elevation: route.elevation,
    //fotos: beach.photos,
    private: route.private,
    selected: false,
  }));


  const cogerPuntos = PruebaPuntosBorrar.map((punto) => {
    return new Location(1, punto.latitude, punto.longitude, punto.elevation,
      punto.time, 2)
  })

  // Añadimos los puntos como atributo `locations` a la primera fila
  if (rows.value.length > 0) {
    rows.value[0].locations = cogerPuntos; // Añadimos el atributo 'locations' al primer objeto
  }

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

  <GoogleMap
    v-if="rows.length > 0"
    :objectLocation="rows"
  />

  <ManagerGeneral
    v-if="rows.length > 0"
    title="Ruta"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="routeColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewRoute"
    @saveFormularioEdit="saveEditRoutes"
    @eliminarRegistro="deleteRoute"
  />
</template>
