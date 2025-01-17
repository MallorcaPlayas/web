<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderAndDrawer />



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import {linksListArray} from 'src/constantes/ArrayEnlacesInternos.js'
import HeaderAndDrawer from "components/HeaderAndDrawer.vue";

const linksList = ref(linksListArray)


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
