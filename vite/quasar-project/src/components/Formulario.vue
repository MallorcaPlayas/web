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
        <!-- Si campoFormulario.name es 'email', esto equivale a
        v-model="formData['email'].
        Función de v-model:
        v-model implica: Cuando el usuario escribe en el input,
        el valor se guarda automáticamente en formData.value.email,
         Si cambias formData.value.email desde el código,
        el input se actualiza automáticamente en la interfaz.
        Ejemplo práctico: Si campoFormulario.name = 'email' y el usuario introduce "john.doe@example.com", entonces:
        en javascript se veria:
        formData.value.email = "john.doe@example.com";

        -->
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
      <!-- El usuario hace clic en el botón "Cancelar" del formulario
      El componente Formulario emite el evento 'cancelFormulario' al componente padre
      El componente padre detecta el evento y llama al mé_todo closeDialog.
      El diálogo (controlado por dialogOpen) se cierra.-->
      <q-btn flat label="Cancelar" @click="$emit('cancelFormulario')"/>
      <!-- Cuando el usuario hace clic en el botón "Guardar" Se ejecuta la función handleSave.
           esta funcion emite el evento Emite el evento 'save'
           y Envía los datos actuales del formulario (props.formData) al componente padre
           Cuando el hijo emite el evento 'save',
           el padre ejecuta la función saveUser con los datos recibidos como parámetro
           Recuerda que props.formData es donde se guarda la información de 1 usuario-->
      <q-btn flat color="primary" label="Guardar" @click="handleSave"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {toRefs} from 'vue';
import { useQuasar } from 'quasar'
const $q = useQuasar()

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


const definirEmit = defineEmits(['saveFormulario', 'cancelFormulario']); // defineEmits: Declara los eventos que un componente puede emitir a su componente padre.

// Función para guardar datos
const handleSave = () => {
  const message = props.isEdit
      ? 'Registro actualizado exitosamente'
      : 'Nuevo registro creado exitosamente';

  $q.notify({
    color: 'positive', // Cambia el color dependiendo del resultado
    message, // Muestra el mensaje dinámico
    position: 'top', // Posición de la notificación
    timeout: 1000, // Tiempo en milisegundos
  });
  definirEmit('saveFormulario', props.formData);// En formData se guardan los datos del formulario que se enviarán al componente padre
};
</script>
