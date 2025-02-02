<template>
  <q-item
    clickable
    tag="a"
    target="_self"
    :to="props.link"
  >
<!--    :href="props.link para ir a un enlace externo
        :to="props.link para ir a un enlace interno-->
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '/' // Valor por defecto para rutas internas
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>
