<script setup>
import {ref, computed, watch} from 'vue';
import {Quasar} from "quasar";

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


// asigamos a esta nueva variable reactiva el metodo de filtroColumnaSinID
// usando computed nos asegura que el valor de columnasMostrar
// se actualice automáticamente cada vez que props.columns cambie
const columnasMostrar = computed(() => {
  return props.columns.filter((column) => column.noMostrarID !== false);
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
        :rows-per-page-options="[15,25,50,100,0]"
        class="my-sticky-header-table"
        flat
        bordered
        :title="`Gestionar ${title}s`"
        :rows="props.rows"
        :columns="columnasMostrar"
        row-key="id"
    >
      <!-- Personaliza la columna de email22  -->
      <!-- Cuando usas v-slot:body-cell-[name], estás especificando que
      quieres personalizar el contenido de las celdas en el cuerpo de la tabla para una columna específica,
      En este caso personalizaremos las celdas de la columna que tiene el nombre email22
         email22 -> es el nombre de la columna
         padrePasaHijo -> Es el nombre de la variable local que Vue usa para pasar los datos de la fila actual a este slot.-->
      <template v-slot:body-cell-email22="padrePasaHijo">
        <div class="q-pa-sm">
          <a
              :href="`mailto:${padrePasaHijo.row.gmail}`"
          >
            {{ padrePasaHijo.row.gmail }}
          </a>
        </div>
      </template>
      <!-- Slot para personalizar las celdas
      video para ver como funciona los SLOT
      https://www.youtube.com/watch?v=2jzo8_Fof9I

     -->
      <!-- TODO quizas para usar este misma Columna para visualizar las fotos
            tengo que cambiar el nombre de urlFotoPerfil a urlFoto-->
      <template v-slot:body-cell-urlFotoPerfil="pasandoProp">
        <!-- Renderiza la imagen si hay URL, de lo contrario muestra texto -->
        <div class="q-pa-sm flex flex-center">
          <!-- body-cell-urlFotoPerfil indica que queremos personalizar cómo se muestra
          esta columna en el cuerpo de la tabla.          -->
          <!-- Este slot personalizado se activa específicamente para las celdas de la columna
    llamada "urlFotoPerfil" en cada fila de la tabla. -->
          <!-- El componente <q-table> pasa automáticamente los datos de la fila actual a través
          del objeto "pasandoProp". -->
          <!-- Esto es posible porque previamente hemos definido las filas de datos que <q-table>
          debe manejar mediante la propiedad `:rows`. -->
          <!-- pasandoProp.row: Contiene los datos completos de la fila actual. -->
          <img
              v-if="pasandoProp.row.urlFotoPerfil"
              :src="pasandoProp.row.urlFotoPerfil"
              alt="Foto Perfil"
              style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"
          />
          <span v-else>No hay foto</span>
        </div>
      </template>

      <!-- Checkbox para seleccionar todos -->
      <template v-slot:header-cell-select>
        <q-checkbox v-model="selectAll"/>
      </template>

      <!-- Checkbox por fila -->
      <template v-slot:body-cell-select="pasarFila">
        <q-checkbox v-model="pasarFila.row.selected"/>
      </template>

      <!-- Columna de acciones -->
      <template v-slot:body-cell-accion="props">
        <q-btn
            flat
            color="primary"
            icon="edit"
            @click="$emit('edit-row', props.row)"
        />
        <q-btn
            flat
            color="negative"
            icon="delete"
            @click="$emit('delete-row', props.row)"
        />
      </template>
    </q-table>
  </div>
</template>


<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 510px

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

