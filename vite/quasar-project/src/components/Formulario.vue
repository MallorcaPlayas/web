<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ isEdit ? 'Editar ' + title : 'Agregar ' + title }}</div>
    </q-card-section>
    <q-card-section>
      <!-- Iteración por los campos -->
      <template v-for="field in fields" :key="field.name">
        <!-- Si el tipo es 'select', usamos q-select -->
        <q-select
          v-if="field.type === 'select'"
          v-model="formData[field.name]"
          :label="field.label"
          :options="typeof field.options === 'function' ? field.options() : field.options"
          :multiple="field.multiple || false"
          filled
          dense
        />
        <!-- Si el tipo es 'toggle', usamos q-toggle -->
        <q-toggle
          v-else-if="field.type === 'toggle'"
          v-model="formData[field.name]"
          :label="field.label"
          dense
        />
        <!-- Si no es 'select' ni 'toggle', usamos q-input -->
        <q-input
          v-else
          v-model="formData[field.name]"
          :label="field.label"
          :type="field.type || 'text'"
          :rules="field.rules || []"
          filled
          dense
        />
      </template>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancelar" @click="$emit('cancel')" />
      <q-btn flat color="primary" label="Guardar" @click="handleSave" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true, // Datos del formulario que se actualizarán
  },
  fields: {
    type: Array,
    required: true, // Campos dinámicos [{ name: 'nombre', label: 'Nombre', type: 'text' }]
  },
  isEdit: {
    type: Boolean,
    default: false, // Define si el formulario está en modo edición
  },
  title: {
    type: String,
    required: true, // Título para mostrar en el formulario
  },
});



const emit = defineEmits(['save', 'cancel']); // Eventos para guardar y cancelar

// Función para guardar datos
const handleSave = () => {
  emit('save', props.formData);// Usa "emit" en lugar de "$emit"
};
</script>
