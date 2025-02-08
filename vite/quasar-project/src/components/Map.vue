<template>

  <GoogleMap
      :api-key="apiKey"
      style="width: 100%; height: 500px"
      :center="initLocation"
      :zoom="12"
  >
    <Polyline :options="{
      path: lonLng,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0
    }"/>
  </GoogleMap>
</template>

<script setup>
import {GoogleMap , Polyline} from "vue3-google-map";
import {onMounted, ref} from "vue";

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const props = defineProps({
  locations: {
    type: Array,
    required: false,
  },
});

const lonLng = ref([]);
const initLocation = ref({});

onMounted(async()=>{
  lonLng.value = props.locations.map(location => extractLatitudeLongitude(location));

  initLocation.value = lonLng.value.at(0);
})

function extractLatitudeLongitude(location){
  return {
    lat: location.latitude,
    lng: location.longitude
  }
}

</script>

