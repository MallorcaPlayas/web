<!--<template>-->
<!--  <q-item-label header>-->
<!--    Panel de Administración-->
<!--  </q-item-label>-->

<!--  <q-page class="flex justify-around">-->

<!--    <EssentialLink-->
<!--      v-for="link in linksList"-->
<!--      v-bind="link"-->
<!--    />-->
<!--  </q-page>-->
<!--</template>-->

<!--<script setup>-->
<!--import EssentialLink from 'components/Link.vue'-->
<!--import {linksList} from 'src/constants/linksList.js'-->
<!--</script>-->


<template>
  <div class="text-h5 text-weight-bold q-mb-md">Admin Panel</div>

  <q-container class="q-gutter-md row justify-center">
    <q-card v-for="item in cards" :key="item.label" class="my-card">
      <q-img :src="item.image" class="card-image" />
      <q-card-section class="text-center">
        <q-btn unelevated class="full-width" color="primary" :label="item.label" />
      </q-card-section>
    </q-card>
  </q-container>
</template>

<script setup>
import {linksList} from 'src/constants/linksList.js'
</script>
