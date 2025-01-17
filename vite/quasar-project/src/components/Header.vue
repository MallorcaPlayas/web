<script setup>
import {ref} from "vue";

import EssentialLink from "components/EssentialLink.vue";
import {linksListArray} from "src/constantes/ArrayEnlacesInternos.js";
const linksListBB = ref(linksListArray); // Lista reactiva

// Props
const variable1 = defineProps({
  leftDrawerOpen: {
    type: Boolean,
    default: true,
  },
});

// Emitir evento al padre para alternar el drawer
const emits = defineEmits(["toggleDrawer"]);

function toggleLeftDrawer() {
  emits("toggleDrawer"); // Emite el evento al padre
}

console.log("El estado es: ", variable1.leftDrawerOpen);
</script>

<template>
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

      <q-toolbar-title>Mallorca Playa</q-toolbar-title>

      <q-btn round>
        <q-avatar size="42px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </q-btn>
    </q-toolbar>
  </q-header>

  <q-drawer
    :model-value="leftDrawerOpen"
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
