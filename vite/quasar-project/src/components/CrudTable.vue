<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true, // El título de la tabla
  },
  rows: {
    type: Array,
    required: true, // Los datos de las filas
  },
  columns: {
    type: Array,
    required: true, // Las columnas de la tabla
  },
  actions: {
    type: Object,
    required: true, // Objeto con las funciones de agregar, editar y eliminar
  },
});

// Computed para manejar el estado "seleccionar todos"
const selectAll = computed({
  get: () => props.rows.length > 0 && props.rows.every((row) => row.selected), // Verifica si todas las filas están seleccionadas
  set: (value) => {
    props.rows.forEach((row) => {
      row.selected = value; // Ajusta el estado de "selected" en todas las filas
    });
  },
});

// Observa los cambios en selectAll
watch(selectAll, (newValue) => {
  console.log('Seleccionar todos:', newValue);
});
</script>

<template>
  <div class="q-pa-md">
    <!-- Botón para agregar -->
    <q-btn
      color="primary"
      icon="add"
      :label="`Agregar ${title}`"
      class="q-mb-md q-mt-xl q-ml-xs"
      @click="props.actions.openAddDialog"
    />

    <!-- Botón para eliminar seleccionados -->
    <q-btn
      color="negative"
      icon="delete"
      :label="`Eliminar ${title}s Seleccionadas`"
      class="q-mb-md q-mt-xl q-ml-md"
      @click="props.actions.deleteSelected"
    />

    <!-- Tabla CRUD -->
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      :title="`Gestionar ${title}s`"
      :rows="props.rows"
      :columns="props.columns"
      row-key="id"
    >
      <!-- Checkbox para seleccionar todos -->
      <template v-slot:header-cell-select>
        <q-checkbox v-model="selectAll" />
      </template>

      <!-- Checkbox por fila -->
      <template v-slot:body-cell-select="props">
        <q-checkbox v-model="props.row.selected"/>
      </template>

      <!-- Columna de acciones -->
      <template v-slot:body-cell-accion="props">
        <q-btn
          flat
          color="primary"
          icon="edit"
          @click="props.actions.edit(props.row)"
        />
        <q-btn
          flat
          color="negative"
          icon="delete"
          @click="props.actions.confirmDelete(props.row)"
        />
      </template>
    </q-table>
  </div>
</template>


<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #00b4ff

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */




  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */

  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

