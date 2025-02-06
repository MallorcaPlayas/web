<script setup>
import {ref} from "vue";

import EssentialLink from "components/EssentialLink.vue";
import {linksListArray} from "src/constantes/ArrayEnlacesInternos.js";

const linksListBB = ref(linksListArray); // Lista reactiva

// "menuLateral" es una variable reactiva que representa el estado del menú lateral (abierto o cerrado).
const menuLateral = ref(false); // Estado inicial del menú lateral
// La función "abrirCerrarMenu" alterna su valor cuando es llamada, permitiendo abrir o cerrar el menú.
function abrirCerrarMenu() {
  menuLateral.value = !menuLateral.value;
}
const logout = () => {
  localStorage.removeItem("authToken"); // Eliminar token
  window.location.reload(); // Recargar la página para aplicar la autenticación correctamente
};

</script>

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
        @click="abrirCerrarMenu()"
      />

      <q-toolbar-title>Mallorca Playa</q-toolbar-title>

      <q-btn round>
        <q-avatar size="42px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </q-btn>

      <q-btn
        flat
        dense
        round
        icon="logout"
        aria-label="Logout"
        @click="logout">
      </q-btn>
    </q-toolbar>
  </q-header>
  <!-- q-drawer Es el componente que representa el panel lateral-->
  <!--  El :model-value el flujo de datos es unidireccional (del padre al hijo).-->
  <q-drawer
    v-model="menuLateral"
    bordered
  >
    <q-list>
      <q-item-label header>Panel de Administración</q-item-label>
      <EssentialLink
        v-for="linkA in linksListBB"
        :key="linkA.title"
        v-bind="linkA"
      />
    </q-list>
  </q-drawer>
</template>

<style scoped lang="sass">

</style>
