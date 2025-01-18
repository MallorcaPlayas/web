<script setup>
import {ref} from 'vue';

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
  // selectAll: {
  //   type: Boolean,
  //   default: false, // Estado inicial del checkbox para seleccionar todos
  // },
  // actions: {
  //   type: Object,
  //   required: true, // Objeto con las funciones de agregar, editar y eliminar
  // },
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

        />

    <!-- Botón para eliminar seleccionados -->
    <!--    <q-btn-->
    <!--      color="negative"-->
    <!--      icon="delete"-->
    <!--      :label="`Eliminar ${title}s Seleccionados`"-->
    <!--      class="q-mb-md q-mt-xl q-ml-md"-->
    <!--      @click="actions.deleteSelected"-->
    <!--    />-->

    <!-- Tabla CRUD -->
        <q-table
          class="my-sticky-header-table"
          flat
          bordered
          :title="`Gestionar ${title}s`"
          :rows="rows"
          :columns="columns"
          row-key="id"
        >
    <!--      &lt;!&ndash; Checkbox para seleccionar todos &ndash;&gt;-->
    <!--      <template v-slot:header-cell-select>-->
    <!--        <q-checkbox v-model="selectAll" />-->
    <!--      </template>-->

    <!--      &lt;!&ndash; Checkbox por fila &ndash;&gt;-->
    <!--      <template v-slot:body-cell-select="props">-->
    <!--        <q-checkbox v-model="props.row.selected" />-->
    <!--      </template>-->

    <!--      &lt;!&ndash; Columna de acciones &ndash;&gt;-->
    <!--      <template v-slot:body-cell-accion="props">-->
    <!--        <q-btn-->
    <!--          flat-->
    <!--          color="primary"-->
    <!--          icon="edit"-->
    <!--          @click="actions.edit(props.row)"-->
    <!--        />-->
    <!--        <q-btn-->
    <!--          flat-->
    <!--          color="negative"-->
    <!--          icon="delete"-->
    <!--          @click="actions.confirmDelete(props.row)"-->
    <!--        />-->

        </q-table>
  </div>
</template>


<style scoped>
.my-sticky-header-table {
  height: 310px;
}
</style>
