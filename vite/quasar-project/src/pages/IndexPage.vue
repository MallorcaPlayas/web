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
  <div class="text-h5 text-weight-bold q-mb-md"> {{ t('indexPage.title') }}</div>

</template>

<script setup>

import { getLinksList } from "src/constants/linksList.js";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const linksList = getLinksList(t); //  Llamamos a getLinksList pasando `t`

</script>
