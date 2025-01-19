<template>
  <q-dialog :model-value="internalOpen" @update:model-value="updateOpen">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
        <p>{{ message }}</p>
      </q-card-section>

      <q-card-section>
        <q-radio
          v-for="option in options"
          :key="option.value"
          v-model="selectedOption"
          :val="option.value"
          :label="option.label"
          :sublabel="option.sublabel"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" @click="cancel" />
        <q-btn flat label="Continuar" color="primary" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  modelValue: { type: Boolean, required: true }, // El control del estado abierto/cerrado se realiza a través de modelValue
  title: { type: String, default: 'Confirmación' },
  message: { type: String, default: '¿Estás seguro de continuar?' },
  options: {
    type: Array,
    default: () => [
      {value: 'option1', label: 'Opción 1', sublabel: ''},
      {value: 'option2', label: 'Opción 2', sublabel: ''},
    ],
  },
});

// Emit
const emit = defineEmits(['update:model-value', 'confirm', 'cancel']); // Eventos emitidos

// Estado interno
const internalOpen = ref(props.modelValue);
const selectedOption = ref(null);

// Métodos
const confirm = () => {
  if (!selectedOption.value) {
    console.warn('No se seleccionó ninguna acción');
    return;
  }

  emit('confirm', selectedOption.value); // Emitir la acción seleccionada
  emit('update:model-value', false); // Cerrar el diálogo
};


const cancel = () => {
  emit('cancel'); // Emitir evento de cancelación
  emit('update:model-value', false); // Cerrar el diálogo
};

// Sincronizar estado interno con modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    internalOpen.value = newVal;
  }
);

const updateOpen = (newValue) => {
  internalOpen.value = newValue;
  emit('update:model-value', newValue); // Actualizar el estado externo
};
</script>

<style scoped>
/* Agregar estilos personalizados si es necesario */
</style>
