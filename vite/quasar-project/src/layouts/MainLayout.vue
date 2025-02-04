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
          @click="openCloseDrawer()"
        />

        <q-toolbar-title>Mallorca Playa</q-toolbar-title>

        <q-btn round>
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="profile image">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" bordered>
      <q-list>
        <q-item-label header>Panel de Administración</q-item-label>
        <Link v-for="link in linksList" v-bind="link"/>
      </q-list>
    </q-drawer>


    <q-page-container>
      <q-page>
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import {linksList} from "src/constants/linksList.js";
import Link from "components/Link.vue";
import {ref} from "vue";

const drawerOpen = ref(false); // Estado inicial del menú lateral

function openCloseDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
</script>

