<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import beachService from 'src/service/beachService.js';
import {ref} from "vue";

const rows = ref([

]);

const fieldsFormulario = [

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
    name: 'nombre',
    label: 'Nombre de Ruta',
    align: 'left',
    field: 'nombre',
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
  {
    name: 'denuncias',
    label: 'Denuncias',
    align: 'center',
    field: 'denuncias',
    sortable: true,
    columnaVisible: true // Número de denuncias asociadas a la ruta
  },
  {
    name: 'distancia',
    label: 'Distancia',
    align: 'center',
    field: 'distancia',
    sortable: true,
    columnaVisible: true, // Distancia total de la ruta
    format: val => `${val} km` // Formato para mostrar distancia
  },
  {
    name: 'desnivel',
    label: 'Desnivel',
    align: 'center',
    field: 'desnivel',
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
    name: 'accion',
    label: 'Acción',
    align: 'center',
    field: 'accion',
    sortable: false,
    columnaVisible: true // Botones de acción (editar/eliminar)
  }
];


const saveNewRoute = (newRoute) => {
  console.log("Objeto recibido del emit saveFormularioAdd:", newRoute);
  rows.value.push(newRoute);

};

const saveEditRoutes = (route) => {
  console.log("Objeto recibido en saveEditUser:", route);
  const index = rows.value.findIndex(row => row.id === route.id);
  if (index !== -1) {
    rows.value[index] = route;
  } else {
    console.warn("No se encontró la playa a editar.");
  }
}

  const deleteRoute = (route) => {
    console.log("Objeto recibido en deleteUser:", route);
    const index = rows.value.findIndex(row => row.id === route.id);
    if (index !== -1) {
      rows.value.splice(index, 1);
    } else {
      console.warn("No se encontró la playa a eliminar");

    }

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
