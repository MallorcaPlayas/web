<template>
  <!--  Añadir un titulo de panel de administracion-->
  <q-item-label
    header
  >
    Panel de Administración
  </q-item-label>
  <q-page class="flex justify-around">
    <EssentialLink
      v-for="link in linksList"
      :key="link.title"
      v-bind="link"
    />
  </q-page>

</template>

<script setup>
import {ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import {linksListArray} from 'src/constantes/ArrayEnlacesInternos.js'

const linksList = ref(linksListArray)
</script>
