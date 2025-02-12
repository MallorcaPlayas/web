<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {computed, onMounted, ref} from "vue";
import {RouteService} from "src/service/RouteService.js";
import RouteUploader from "components/RouteUploader.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const routeService = new RouteService()

const rows = ref([]);


const fieldsFormulario = computed(() => [
  {
    name: 'name',
    label: t("routePage.fieldsFormulario.name"),
    rules: [val => !!val || t("routePage.fieldsFormulario.rules.required")],
  },
  // {
  //   name: 'zona',
  //   label: t("routePage.fieldsFormulario.zona"),
  //   rules: [val => !!val || t("routePage.fieldsFormulario.rules.required")],
  // },
  // {
  //   name: 'descripcion',
  //   label: t("routePage.fieldsFormulario.descripcion"),
  //   rules: [val => !!val || t("routePage.fieldsFormulario.rules.required")],
  //   type: 'textarea', // Campo tipo texto largo para descripciones
  // },
  // {
  //   name: 'paginaWeb',
  //   label: t("routePage.fieldsFormulario.paginaWeb"),
  //   rules: [val => !val || val.startsWith('http') || t("routePage.fieldsFormulario.rules.urlInvalid")],
  //   type: 'url', // Campo de tipo URL
  // },
  // {
  //   name: 'fotos',
  //   label: t("routePage.fieldsFormulario.fotos"),
  //   // rules: [val => val && Array.isArray(val) || t("routePage.fieldsFormulario.rules.invalidList")],
  //   type: 'text', // Campo para ingresar las URLs de las fotos
  // },
  // {
  //   name: 'tipoRuta',
  //   label: t("routePage.fieldsFormulario.tipoRuta"),
  //   options: ['Senderismo', 'Ciclismo', 'Trail Running'], // Opciones de tipo de ruta
  //   type: 'select',
  //   rules: [val => !!val || t("routePage.fieldsFormulario.rules.selectAtLeastOneType")],
  // },
  {
    name: 'private',
    label: t("routePage.fieldsFormulario.private"),
    field: 'private',
  },
  {
    name: 'estado',
    label: t("routePage.fieldsFormulario.estado"),
    type: 'toggle', // Permite habilitar o deshabilitar la ruta
  },
]);


const routeColumns = computed(() => [
  {
    name: 'select',
    label: t("routePage.routeColumns.select"),
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: t("routePage.routeColumns.id"),
    field: 'id',
    sortable: true,
    noMostrarID: false // Permite ocultar el ID si es necesario
  },
  {
    name: 'localizacion',
    label: t("routePage.routeColumns.localizacion"),
    align: 'left',
    field: 'zona',
    sortable: true,
    columnaVisible: true // Representa la región o ubicación de la ruta
  },
  {
    name: 'name',
    label: t("routePage.routeColumns.name"),
    align: 'left',
    field: 'name',
    sortable: true,
    columnaVisible: true // Puede ser ocultada si es necesario
  },
  {
    name: 'map',
    label: t("routePage.routeColumns.map"),
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'zona',
    label: t("routePage.routeColumns.zona"),
    align: 'left',
    field: 'zona',
    sortable: true,
    columnaVisible: true // Representa la región o ubicación de la ruta
  },
  {
    name: 'paginaWeb',
    label: t("routePage.routeColumns.paginaWeb"),
    align: 'left',
    field: 'paginaWeb',
    sortable: false,
    columnaVisible: true,
    format: val => val ? `<a href="${val}" target="_blank">${t("routePage.routeColumns.seePage")}</a>` : t("routePage.routeColumns.noWebsite") // Permite acceder a la página web de la ruta
  },
  {
    name: 'fotos',
    label: t("routePage.routeColumns.fotos"),
    field: 'fotos',
    align: 'center',
    format: val => val.length ? `${val.length} ${t("routePage.routeColumns.photosAvailable")}` : t("routePage.routeColumns.noPhotos"),
    sortable: false,
    columnaVisible: true // Muestra la cantidad de fotos disponibles
  },
  {
    name: 'descripcion',
    label: t("routePage.routeColumns.descripcion"),
    align: 'left',
    field: 'descripcion',
    sortable: false,
    columnaVisible: true // Breve descripción de la ruta
  },
  // {
  //   name: 'denuncias',
  //   label: t("routePage.routeColumns.denuncias"),
  //   align: 'center',
  //   field: 'denuncias',
  //   sortable: true,
  //   columnaVisible: true // Número de denuncias asociadas a la ruta
  // },
  {
    name: 'distance',
    label: t("routePage.routeColumns.distance"),
    align: 'center',
    field: 'distance',
    sortable: true,
    columnaVisible: true, // Distancia total de la ruta
    format: val => `${val} km` // Formato para mostrar distancia
  },
  {
    name: 'duration',
    label: t("routePage.routeColumns.duration"),
    align: 'center',
    field: 'duration',
    sortable: true,
    columnaVisible: true, // Desnivel de la ruta
    format: val => `${val} m` // Formato para mostrar el desnivel
  },
  {
    name: 'elevation',
    label: t("routePage.routeColumns.elevation"),
    align: 'center',
    field: 'elevation',
    sortable: true,
    columnaVisible: true, // Desnivel de la ruta
    format: val => `${val} m` // Formato para mostrar el desnivel
  },
  {
    name: 'valoracion',
    label: t("routePage.routeColumns.valoracion"),
    align: 'center',
    field: 'valoracion',
    sortable: true,
    columnaVisible: true, // Valoración promedio de la ruta
    format: val => `${val} / 5` // Formato para mostrar la valoración
  },
  {
    name: 'private',
    label: t("routePage.routeColumns.private"),
    align: 'center',
    field: 'private',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'accion',
    label: t("routePage.routeColumns.accion"),
    align: 'center',
    field: 'accion',
    sortable: false,
    columnaVisible: true // Botones de acción (editar/eliminar)
  }
]);


onMounted(async () => {

  const routesData = await routeService.getAll()

  rows.value = routesData.map(route => ({
    id: route.id,
    name: route.name,
    map: route.locations,
    //municipio: 'Almería',
    distance: route.distance,
    duration: route.duration,
    elevation: route.elevation,
    //fotos: beach.photos,
    private: route.private,
    selected: false,
  }));
})

const saveNewRoute = (newRoute) => {
  routeService.create(newRoute)
};

const saveEditRoutes = (route) => {
  routeService.update(route)
}

const deleteRoute = (route) => {
  routeService.delete(route.id)
}

</script>

<template>
  <RouteUploader/>
  <ManagerGeneral
    v-if="rows.length > 0"
    :title="t('routePage.managerGeneral.title')"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="routeColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewRoute"
    @saveFormularioEdit="saveEditRoutes"
    @eliminarRegistro="deleteRoute"
  />
</template>
