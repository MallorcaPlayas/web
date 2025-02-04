<template>
  <q-layout view="lHh Lpr lFf">
    <ToolBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ToolBar from "components/ToolBar.vue";
</script>
