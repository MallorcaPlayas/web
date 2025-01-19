<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ isEdit ? 'Editar ' + title : 'Agregar ' + title }}</div>
    </q-card-section>
    <q-card-section>
      <!-- Iteración por los campos -->
      <template v-for="campoFormulario in fields" :key="campoFormulario.name">
        <!-- Si el tipo es 'select', usamos q-select -->
        <q-select
          v-if="campoFormulario.type === 'select'"
          v-model="formData[campoFormulario.name]"
          :label="campoFormulario.label"
          :options="typeof campoFormulario.options === 'function' ? campoFormulario.options() : campoFormulario.options"
          :multiple="campoFormulario.multiple || false"
          filled
          dense
        />
        <!-- Si el tipo es 'toggle', usamos q-toggle -->
        <q-toggle
          v-else-if="campoFormulario.type === 'toggle'"
          v-model="formData[campoFormulario.name]"
          :label="campoFormulario.label"
          dense
        />
        <!-- Si no es 'select' ni 'toggle', usamos q-input -->
        <!-- Explicación de v-model="formData[campoFormulario.name]"
             Si campoFormulario.name = 'email', entonces
              Ejemplo de como se veria en el javascript:
              formData.value.email = 'john.doe@example.com';       -->
        <q-input
          v-else
          v-model="formData[campoFormulario.name]"
          :label="campoFormulario.label"
          :type="campoFormulario.type || 'text'"
          :rules="campoFormulario.rules || []"
          filled
          dense
        />
      </template>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancelar" @click="$emit('cancel')"/>
      <q-btn flat color="primary" label="Guardar" @click="handleSave"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {toRefs} from 'vue';

const props = defineProps({
  formData: {
    type: Object, // Datos del formulario que se actualizarán, se envia un objeto
    required: true, // Datos del formulario que se actualizarán
  },
  fields: {
    type: Array, // Es un array de objetos [{ name: 'nombre', label: 'Nombre', type: 'text' }]
    required: true,
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
