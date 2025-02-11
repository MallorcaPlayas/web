<template>

  <ManagerGeneral
    v-if="rows.length > 0"
    :title="t('beachPage.managerGeneral.title')"
    :fieldsToForm="fieldsForm"
    :columnaTabla="beachColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewBeach"
    @saveFormularioEdit="saveEditBeach"
    @eliminarRegistro="deleteBeach"
  />
</template>

<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {BeachService} from 'src/service/BeachService.js';
import {TypeBeachService} from 'src/service/TypeBeachService.js';
import { computed, ref, onMounted } from "vue";
import {ServiceBeachService} from "src/service/ServiceBeachService.js";

const beachService = new BeachService()
const typeBeachService = new TypeBeachService()
const serviceBeachService = new ServiceBeachService()
const rows = ref([]);
const typeBeach = ref();
const beachServices = ref();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const fieldsForm = computed(() => [
  {
    name: 'name',
    label: t("beachPage.fieldsForm.name"),
    rules: [val => !!val || 'Campo obligatorio'],
  },
  {
    name: 'municipio',
    label: t("beachPage.fieldsForm.municipio"),
    rules: [val => !!val || 'Campo obligatorio'],
  },
  {
    name: 'description',
    label: t("beachPage.fieldsForm.description"),
    rules: [val => !!val || 'Campo obligatorio'],
    type: 'textarea', // Puede ser tipo textarea para descripciones largas
  },
  {
    name: 'types',
    label: t("beachPage.fieldsForm.types"),
    options: () => typeBeach.value, // Opciones obtenidas de la API. TIENE QUE TENER EL ID Y EL NAME
    // value: () => types.value.map(type => type.id),
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos un tipo de playa'],
    multiple: true, // Permite seleccionar múltiples opciones
  },
  {
    name: 'services',
    label: t("beachPage.fieldsForm.services"),
    options: () => beachServices.value, // Opciones de servicios
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos un servicio'],
    multiple: true, // Permite múltiples selecciones
  },
  // {
  //   name: 'fotos',
  //   label: 'URLs de Fotos',
  //   rules: [val => val && Array.isArray(val) || 'Debe ser una lista de URLs válidas'],
  //   type: 'text',
  // },
  {
    name: 'cameras',
    label: t("beachPage.fieldsForm.cameras"),
    //rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
    //type: 'url',
  },
  // {
  //   name: 'empresaSocorrista',
  //   label: 'Empresa de Socorrismo',
  //   rules: [val => !!val || 'Campo obligatorio'],
  // },
  // {
  //   name: 'denuncias',
  //   label: 'Número de Denuncias',
  //   rules: [
  //     val => (val !== null && val !== '' && parseInt(val) != NaN) || 'Por favor introduce un número',
  //     val => val >= 0 || 'Debe ser un número positivo o cero',
  //   ],
  //   type: 'number',
  // },
  // {
  //   name: 'paginaWeb',
  //   label: 'Página Web (URL)',
  //   rules: [val => !val || val.startsWith('http') || 'Debe ser una URL válida'],
  //   type: 'url',
  // },
  {
    name: 'estado',
    label: t("beachPage.fieldsForm.estado"),
    type: 'toggle',
  },
]);


const beachColumns = computed(() => [
  {
    name: 'select',
    label: 'Select',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    sortable: true,
    showId: false
  },
  {
    name: 'name',
    label: t("beachPage.beachColumns.name"),
    field: 'name',
    sortable: true
  },
  {
    name: 'municipio',
    label: t("beachPage.beachColumns.municipio"),
    field: 'municipio',
    sortable: true
  },
  {
    name: 'description',
    label: t("beachPage.beachColumns.description"),
    field: 'description',
    sortable: false
  },
  {
    name: 'services',
    label: t("beachPage.beachColumns.services"),
    field: 'services', // Se espera que sea un array
    format: (val) =>
      val.map(
          (service) => service._serviceBeach?.name ||
            service.serviceBeach?.name || 'Sin Nombre').join(', '),
    sortable: false
  },
  {
    name: 'types',
    label:  t("beachPage.beachColumns.types"),
    field: 'types', // Se espera que sea un array
    format: (val) => val.map((type) => type.name).join(', '),
    sortable: false
  },


  {
    name: 'fotos',
    label:  t("beachPage.beachColumns.fotos"),
    field: 'fotos', // Se espera que sea una URL o un array de URLs
    format: val => val.length ? `${val.length} foto(s)` : 'No hay fotos',
    sortable: false
  },
  {
    name: 'cameras',
    label: t("beachPage.beachColumns.cameras"),
    field: 'urlCamaraWeb', // Se espera que sea una URL
    format: val => val ? `<a href="${val}" target="_blank">Ver Cámara</a>` : 'Sin cámara',
    sortable: false
  },

  // {
  //   name: 'empresaSocorrista',
  //   label: 'Empresa Socorrista',
  //   field: 'empresaSocorrista',
  //   sortable: true
  // },
  // {
  //   name: 'denuncias',
  //   label: 'Denuncias',
  //   field: 'denuncias', // Se espera que sea un número
  //   sortable: true
  // },
  // {
  //   name: 'paginaWeb',
  //   label: 'Página Web',
  //   field: 'paginaWeb', // Se espera que sea una URL
  //   format: val => val ? `<a href="${val}" target="_blank">Ver Página</a>` : 'Sin página web',
  //   sortable: false
  // },
  {
    name: 'accion',
    label: t("beachPage.beachColumns.accion"),
    align: 'center',
    field: 'accion',
    sortable: false
  }
]);

onMounted(async () => {
  const beachesData = await beachService.getAll()
  const typesData = await typeBeachService.getAll()
  const servicesData = await serviceBeachService.getAll()

  typeBeach.value = typesData
  beachServices.value = servicesData

  rows.value = beachesData.map(beach => ({
    id: beach.id,
    name: beach.name,
    //municipio: 'Almería',
    description: beach.description,
    types: beach.types,
    services: beach.services,
    //fotos: beach.photos,
    cameras: beach.cameras,
    selected: false,
  }));
})

const saveNewBeach = (newBeach) => {
  beachService.create(newBeach);
};

const saveEditBeach = (beach) => {
  beachService.update(beach);
}

const deleteBeach = (beach) => {
  beachService.delete(beach.id);
}


</script>
