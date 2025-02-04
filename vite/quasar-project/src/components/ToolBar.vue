<template>
  <q-header elevated>
    <q-toolbar>
      <!-- Botón que el usuario puede pulsar para alternar el estado del menú lateral. -->
      <!-- Al hacer clic, llama a la función "emitirSenalPadre",
      que notifica al componente padre a través del evento "toggleDrawer1". -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="openCloseMenu()"
      />

      <q-toolbar-title>Mallorca Playa</q-toolbar-title>

      <q-btn round>
        <q-avatar size="42px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </q-btn>
    </q-toolbar>
  </q-header>
  <!-- q-drawer Es el componente que representa el panel lateral-->
  <!--  El :model-value el flujo de datos es unidireccional (del padre al hijo).-->
  <q-drawer v-model="lateralMenu" bordered>

    <q-list>
      <q-item-label header>Panel de Administración</q-item-label>
      <Link v-for="link in linksList" v-bind="link"/>
    </q-list>

  </q-drawer>

</template>

<script setup>
import {ref} from "vue";
import Link from "components/Link.vue";
import {linksList} from "src/constants/linksList.js";

// "menuLateral" es una variable reactiva que representa el estado del menú lateral (abierto o cerrado).
const lateralMenu = ref(false); // Estado inicial del menú lateral

function openCloseMenu() {
  lateralMenu.value = !lateralMenu.value;
}

</script>

<style scoped lang="sass">

</style>
