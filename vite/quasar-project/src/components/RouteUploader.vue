<template>
  <div>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-uploader
          style="max-width: 300px"
          label="Subir archivo GPX"
          accept=".gpx"
          :factory="uploadFile"
          :auto-upload="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {RouteService} from "src/service/RouteService.js";

const routeService = new RouteService();

const uploadFile = async (file) => {
    return await routeService.upload(file[0]);
};
</script>

<style scoped>

</style>


;
