<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ isEdit ? 'Editar ' + title : 'Agregar ' + title }}</div>
    </q-card-section>
    <q-card-section>
      <!-- Iteración por los campos -->
      <q-form class="q-gutter-md">
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
            option-value="name"
            option-label="name"
            emit-value
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
      </q-form>
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
      <q-btn flat color="primary" label="Guardar"
             :disable="!isFormValid"
             @click="onSubmit"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useQuasar} from 'quasar'

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


// Computed para verificar si el formulario es válido
// TODO para que sirve el computed?
// Un computed es una propiedad reactiva calculada que devuelve un valor basado
// en otros valores. Se actualiza automáticamente cuando cambian los datos reactivos
// de los que depende. En el caso de isFormValid, verifica si todos los campos del formulario
// son válidos recorriendo sus reglas de validación. Si todas las reglas se cumplen, devuelve true;
// de lo contrario, devuelve false. A diferencia de una función, no necesitas invocarlo con paréntesis (isFormValid()),
// simplemente lo usas como una propiedad (isFormValid)

// TODO resumen:
// computed -> "Es como una función" qie Crea una propiedad reactiva calculada, isFormValid,
// que se actualizará automáticamente cada vez que cambien los valores de props.fields o props.formData

const isFormValid = computed(() => {
  return props.fields.every((campoFormulario) => { // el metodo every() verifica si todos los elementos de un array cumplen una condición, en este caso, que todas las reglas de validación se cumplan. Si lo cumplen, devuelve true; de lo contrario, devuelve false.
    const valorIntroducidoFormulario = props.formData[campoFormulario.name]; // Obtiene el valor del campo del formulario
    const reglas = campoFormulario.rules || []; // Si no hay reglas ponemos un array vacio
    // Verifica si todas las reglas se cumplen
    //  ": true"  Si regla no es una función, automáticamente devuelve true
    return reglas.every((regla) => typeof regla === 'function' ? regla(valorIntroducidoFormulario) === true : true);
  });
});

//Método para manejar el envío
const onSubmit = () => {
  if (isFormValid.value) {
    // Validación exitosa
    const message = props.isEdit
      ? 'Registro actualizado exitosamente'
      : 'Nuevo registro creado exitosamente';

    $q.notify({
      color: 'positive',
      message,
      position: 'top',
      timeout: 1000,
    });

    definirEmit('saveFormulario', props.formData);
  } else {
    // Validación fallida
    $q.notify({
      color: 'negative',
      message: 'Por favor, complete todos los campos obligatorios.',
      position: 'top',
      timeout: 1000,
    });
  }
};



</script>
