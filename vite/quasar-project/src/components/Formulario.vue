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
            v-if="campoFormulario.type === 'select' && campoFormulario.name !== 'services' && campoFormulario.name !== 'functions'"
            v-model="formData[campoFormulario.name]"
            :label="campoFormulario.label"
            :options="typeof campoFormulario.options === 'function' ? campoFormulario.options() : campoFormulario.options"
            :multiple="campoFormulario.multiple || false"
            filled
            dense

            option-label="name"
            emit-value
          />

          <!-- Servicios Playa -->
          <div v-else-if="campoFormulario.name === 'services'">
            <h6>Servicios de Playa</h6>
            <div v-for="(servicio, index) in formData.services" :key="'servicio-' + index" class="q-gutter-md">
              <!-- Selección del servicio -->
              <q-select
                v-model="servicio.serviceBeach"
                :label="'Servicio de Playa ' + (index + 1)"
                :options="fields.find(f => f.name === 'services').options()"
                option-label="name"
                filled
                dense
                emit-value
              />
              <!-- Hora de inicio -->
              <q-input
                v-model="servicio.startTime"
                label="Hora de Inicio"
                type="time"
                filled
                dense
              />
              <!-- Hora de fin -->
              <q-input
                v-model="servicio.endTime"
                label="Hora de Fin"
                type="time"
                filled
                dense
              />
              <!-- Botón para eliminar servicio -->
              <q-btn
                flat
                color="negative"
                icon="delete"
                @click="eliminarServicio(index)"
                label="Eliminar"
              />
            </div>
            <!-- Botón para añadir más servicios -->
            <q-btn
              flat
              color="primary"
              icon="add"
              @click="agregarServicio"
              label="Añadir Servicio"
            />
          </div>


          <!-- Funciones de Roles -->
          <div v-else-if="campoFormulario.name === 'functions'">
            <h6>Función(es) de este Rol </h6>
            <div v-for="(funcionRol, index) in formData.functions" :key="'functions-' + index" class="q-gutter-md">
              <!-- Selección de la funcion del rol -->
              <q-select
                v-model="funcionRol.functionProj"
                :label="'Función Rol ' + (index + 1)"
                :options="fields.find(f => f.name === 'functions').options()"
                option-label="name"
                filled
                dense
                emit-value
              />

              <!-- Botón para eliminar una funcion de rol -->
              <q-btn
                flat
                color="negative"
                icon="delete"
                @click="eliminarFuncionRol(index)"
                label="Eliminar"
              />
            </div>
            <!-- Botón para añadir más funciones para este rol -->
            <q-btn
              flat
              color="primary"
              icon="add"
              @click="agregarFuncionRol"
              label="Añadir Función"
            />
          </div>
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

const agregarServicio = () => {
  if (!props.formData.services) {
    props.formData.services = []; // Inicializa el array de servicios si no existe
  }
  props.formData.services.push({
    serviceBeach: null, // Servicio inicial vacío
    startTime: '',
    endTime: '',
  });
};


const agregarFuncionRol = () => {
  if (!props.formData.functions) {
    props.formData.functions = []; // Inicializa el array de servicios si no existe
  }
  props.formData.functions.push({
    functionProj: null, // Servicio inicial vacío
  });
};


const saveItem = () => {
  formData.value.services = formData.value.services.map(servicio => ({
    _serviceBeach: servicio._serviceBeach || {id: servicio.serviceBeach.id, name: servicio.serviceBeach.name},
    startTime: servicio.startTime,
    endTime: servicio.endTime,
  }));

  definirEmit('saveFormulario', formData.value);
};

const eliminarServicio = (index) => {
  console.log(`Eliminar servicio ${index}`);
  props.formData.services.splice(index, 1);
};

const eliminarFuncionRol = (index) => {
  console.log(`Eliminar servicio ${index}`);
  props.formData.functions.splice(index, 1);
};

// Inicializar el arreglo de servicios si no existe
if (!props.formData.services) {
  console.log('Inicializar servicios???');
  props.formData.services = [];
}

// Inicializar el arreglo de Funciones para el rol si no existe
if (!props.formData.functions) {
  console.log('Inicializar servicios???');
  props.formData.functions = [];
}


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
