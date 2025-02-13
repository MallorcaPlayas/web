<script setup>
import {onMounted, ref} from "vue";
import {PhotoService} from "src/service/PhotoService.js";

const photos = ref([]);

onMounted(async () =>{
  const photoService = new PhotoService()
  photos.value = await photoService.getAll();
})
</script>

<template>

  {{photos}}

</template>

<style scoped>

</style>
