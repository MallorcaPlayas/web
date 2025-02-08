<template>
  <div>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-uploader
          style="max-width: 300px"
          label="Subir archivo GPX"
          accept=".gpx"
          :factory="uploadFiles"
          multiple
          :auto-upload="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {RouteService} from "src/service/RouteService.js";

const routeService = new RouteService();

const uploadFiles = async (files) => {
    return await routeService.upload(...files);
};
</script>

<style scoped>

</style>


;
