<script setup>
import {ref} from "vue";

import EssentialLink from "components/EssentialLink.vue";
import {linksListArray} from "src/constantes/ArrayEnlacesInternos.js";

const linksListBB = ref(linksListArray); // Lista reactiva

// "defineProps" permite al componente hijo recibir datos del componente padre.
// En este caso, recibe una variable reactiva y lo guardamos
//  en la variable "panelLateral" que indica si el menú lateral está abierto o cerrado.
// El hijo no controla directamente este estado; simplemente lo recibe desde el padre.
const variable1 = defineProps({
  panelLateral: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// "defineEmits" declara los eventos que el componente hijo puede emitir al padre (enviar un aviso al padre
// para que este haga algo).
// Aquí se define "toggleDrawer1", que notifica al padre cuando
// el usuario desea alternar el estado del menú.
// La función "emitirSenalPadre" emite este evento al padre cuando es llamada.
const emits = defineEmits(["toggleDrawer1"]);

function emitirSenalPadre() {
  emits("toggleDrawer1"); // Emite una señal al componente padre
}


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
        @click="emitirSenalPadre"
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
  <q-drawer
    :model-value="panelLateral"
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
