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

    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Gestionar Usuarios"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <!-- Slot personalizado para la columna "Select" -->
        <template v-slot:body-cell-select="props">
          <q-checkbox
            v-model="props.row.selected"
            @update:model="onSelectUser(props.row)"
          />
        </template>

        <!-- Opcional: Checkbox en el header para seleccionar/deseleccionar todos -->
        <template v-slot:header-cell-select>
          <q-checkbox
            v-model="selectAll"
            @update:model="toggleSelectAll"
          />
        </template>
      </q-table>
    </div>

<!--    No entiendo que hace este componente!!! -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>


</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

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
    format: () => 'Edit' // Texto o botón de acción
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
    gmail: 'a@gmail.com',
    accion: 'edit'
  },
  {
    selected: false,
    id: 2,
    nombre_usuario: 'Alexandru',
    rolUser: 'Guía',
    fecha_caducidad: '01/01/2030',
    gmail: 'bb@gmail.com',
    accion: 'edit'
  }
]);

// Estado para seleccionar todas las filas
const selectAll = ref(false);




const linksList = [
  {
    title: 'Gestionar Usuario',
    caption: 'CRUD usuario', // short description
    icon: 'group', // icon can be select from this page -> https://fonts.google.com/icons?selected=Material+Symbols+Outlined:group:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=user&icon.size=24&icon.color=%23e8eaed
    link: 'wwww.google.com'
  },
  {
    title: 'Gestionar Roles',
    caption: 'github.com/quasarframework',
    icon: 'manage_accounts',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Gestionar Playas',
    caption: 'chat.quasar.dev',
    icon: 'beach_access',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Gestionar Rutas',
    caption: 'forum.quasar.dev',
    icon: 'route',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Gestionar Aprovaciones',
    caption: '@QuasarFramework',
    icon: 'approval',
    link: 'https://facebook.quasar.dev'
  },


  {
    title: 'Administrar Denuncias',
    caption: 'Community Quasar projects',
    icon: 'report',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Gestionar Eventos',
    caption: 'Community Quasar projects',
    icon: 'event',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Puntos Globales',
    caption: 'Community Quasar projects',
    icon: 'signpost',
    link: 'https://awesome.quasar.dev'
  }
]

// Función para manejar la selección de un usuario
const onSelectUser = (row) => {
  console.log('Usuario seleccionado:', row);
};

// Función para seleccionar/deseleccionar todas las filas
const toggleSelectAll = () => {
  rows.value.forEach(row => {
    row.selected = selectAll.value;
  });
};

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
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
