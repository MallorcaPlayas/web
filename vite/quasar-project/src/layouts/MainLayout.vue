<template>
  <q-layout view="lHh Lpr lFf">
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

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

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
