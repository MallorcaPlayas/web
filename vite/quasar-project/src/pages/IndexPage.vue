<template>
  <q-item-label header>
    Panel de Administración
  </q-item-label>

  <q-page class="flex justify-around">

    <EssentialLink
      v-for="link in linksList"
      v-bind="link"
    />
  </q-page>
</template>

<script setup>
import EssentialLink from 'components/Link.vue'
import {linksList} from 'src/constants/linksList.js'
</script>
