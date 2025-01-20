<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import beachService from 'src/service/beachService.js';
import {ref} from "vue";

const rows = ref([

]);

const fieldsFormulario = [

];

const beachColumns = [

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
    title="Playa"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="beachColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewRoute"
    @saveFormularioEdit="saveEditRoutes"
    @eliminarRegistro="deleteRoute"
  />
</template>
