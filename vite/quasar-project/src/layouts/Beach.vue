<script setup>
import { ref } from 'vue';

import HeaderAndDrawer from "components/HeaderAndDrawer.vue";
import CrudTable from "components/CrudTable.vue";

const rows = ref([
  { id: 1, nombre: 'Playa 1', selected: false },
  { id: 2, nombre: 'Playa 2', selected: false },
]);

const columns = [
  {name: 'id', label: 'ID', field: 'id', sortable: true},
  {name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true},
  {name: 'accion', label: 'Acción', field: 'accion', sortable: false},
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
    <HeaderAndDrawer />

    <CrudTable
      title="Playa"
      :rows="rows"
      :columns="columns"
    />
  </q-layout>


</template>
