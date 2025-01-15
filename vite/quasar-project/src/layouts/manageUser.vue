<template>
  <q-layout view="lHh Lpr lFf">
<!--    Es el header-->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Mallorca Playa
        </q-toolbar-title>

        <q-btn round>
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>


<!--    la barra de navegacion que se oculta-->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Panel de Administración
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- Tabla CRUD -->
<!--    Boton para agregar un usuario-->
    <div class="q-pa-md">
      <q-btn
        color="primary"
        icon="add"
        label="Agregar Usuario"
        class="q-mb-md q-mt-xl q-ml-xs"
        @click="openAddUserDialog"
      />
      <!-- NUEVO: Botón para eliminar usuarios seleccionados -->
      <q-btn
        color="negative"
        icon="delete"
        label="Eliminar Usuarios Seleccionados"
        class="q-mb-md q-mt-xl q-ml-md"
        @click="deleteSelectedUsers"
      />
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Gestionar Usuarios"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
<!--        Checkbox para seleccionar todos en el encabezado -->
        <template v-slot:header-cell-select>
          <q-checkbox v-model="selectAll" />
        </template>
        <!-- Columna de selección -->
        <template v-slot:body-cell-select="props">
          <q-checkbox v-model="props.row.selected" />
        </template>

        <!-- Columna de acciones -->
        <template v-slot:body-cell-accion="props">
          <q-btn
            flat
            color="primary"
            icon="edit"
            @click="editUser(props.row)"
          />
          <q-btn
            flat
            color="negative"
            icon="delete"
            @click="deleteUser(props.row)"
          />
        </template>
      </q-table>
    </div>

    <!-- Modal para agregar/editar usuarios -->


    <q-dialog v-model="dialogOpen" full-width> <!-- NUEVO: Modal para agregar/editar -->
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ dialogMode === 'edit' ? 'Editar Usuario' : 'Agregar Usuario' }}</div>
        </q-card-section>
        <q-card-section>
<!--          campo obligatorio del input  de nombre de usuario-->

          <q-input v-model="formData.nombre_usuario"
                   label="Nombre de Usuario"
          :rules="[val => !!val || 'Campo obligatorio']"
          />

          <q-select
            v-model="formData.rolUser"
            :options="getRoles()"
            label="Rol"
          />
          <q-input v-model="formData.fecha_caducidad" label="Caducidad" type="date" />
          <q-input v-model="formData.gmail" label="Email" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="closeDialog" />
          <q-btn flat color="primary" label="Guardar" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
<!--    No entiendo que hace este componente!!! -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>


</template>

<script setup>
import { ref, computed, watch   } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {linksListArray} from 'src/constantes/ArrayEnlacesInternos.js'

const linksList = ref(linksListArray)

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const columns = [
  {
    name: 'select',
    label: 'Select',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: 'Id',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'usuario',
    label: 'Usuario',
    align: 'left',
    field: 'nombre_usuario',
    sortable: true
  },
  {
    name: 'rol',
    label: 'Rol',
    align: 'left',
    field: 'rolUser',
    sortable: true
  },
  {
    name: 'caducidad',
    label: 'Caducidad',
    align: 'center',
    field: 'fecha_caducidad',
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'gmail',
    sortable: true
  },
  {
    name: 'accion',
    label: 'Action',
    align: 'center',
    field: 'accion',
    sortable: false,
    // format: () => 'Edit' // Texto o botón de acción
  }
];

// Datos de las filas
const rows = ref([
  {
    selected: false, // Estado del checkbox
    id: 1,
    nombre_usuario: 'Guido Figueroa',
    rolUser: 'Socorrista',
    fecha_caducidad: '12/12/2026',
    gmail: 'a@gmail.com'
    // accion: 'edit'
  },
  {
    selected: false,
    id: 2,
    nombre_usuario: 'Alexandru',
    rolUser: 'Guía',
    fecha_caducidad: '01/01/2030',
    gmail: 'bb@gmail.com'
    // accion: 'edit'
  }
]);


const dialogOpen = ref(false); // NUEVO: Estado del modal
const dialogMode = ref('add'); // NUEVO: Modo del modal ('add' o 'edit')
const formData = ref({}); // NUEVO: Datos del formulario
// const selectAll = ref(false); // Estado del checkbox "seleccionar todos"

// Función para seleccionar o deseleccionar todos los usuarios
const selectAll = computed({
  get: () => rows.value.length > 0 && rows.value.every(row => row.selected), // Todos seleccionados
  set: (value) => {
    rows.value.forEach(row => {
      row.selected = value; // Ajusta el estado de "selected" en todas las filas
    });
  }
});

watch(selectAll, (newValue) => {
  console.log("Seleccionar todos:", newValue);
});



const openAddUserDialog = () => {
  formData.value = { nombre_usuario: '', rolUser: '', fecha_caducidad: '', gmail: '' }; // Inicializar datos
  dialogMode.value = 'add';
  dialogOpen.value = true;
};

const editUser = (row) => {
  formData.value = { ...row }; // Copiar datos del usuario
  dialogMode.value = 'edit';
  dialogOpen.value = true;
};

const saveUser = () => {
  if (dialogMode.value === 'add') {
    rows.value.push({ ...formData.value, id: rows.value.length + 1, selected: false });
  } else {
    const index = rows.value.findIndex(row => row.id === formData.value.id);
    if (index !== -1) {
      rows.value[index] = { ...formData.value };
    }
  }
  dialogOpen.value = false;
};

const deleteUser = (row) => {
  rows.value = rows.value.filter(user => user.id !== row.id);
};

// Función para eliminar usuarios seleccionados
const deleteSelectedUsers = () => {
  rows.value = rows.value.filter(user => !user.selected); // Elimina los usuarios con selected = true
  selectAll.value = false; // Reinicia el estado del checkbox "seleccionar todos"
  console.log('Usuarios seleccionados eliminados');
};

const onSelectUser = (row) => {
  console.log('Usuario seleccionado:', row);
};

// closeDialog: crear metodo para cancelar el dialogo
const closeDialog = () => {
  dialogOpen.value = false;
};

// cuando este agregando o modificando un usuario, el dialogo se abre y solo puedo seleccionar 3 tipos de roles: Socorrista, Guía, Administrador

const roles = ['Socorrista', 'Guía', 'Administrador'];

// metodo solo para mostrar los roles disponibles en el dialogo
const getRoles = () => {
  return roles;
};





</script>

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
