<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, required: true }, // Título genérico (e.g., "Playa", "Usuario", "Ruta")
  fieldsToForm: { type: Array, required: true }, // Campos del formulario
  columnaTabla: { type: Array, required: true }, // Columnas de la tabla
  filasTabla: { type: Object, required: true }, // filas de la tabla
});

import CrudTable from 'components/CrudTable.vue';
import Form from "components/Form.vue";
import ConfirmDialog from 'components/ConfirmDialog.vue';

const formData = ref({});
const dialogMode = ref('add');
const dialogOpen = ref(false);
const confirmDialogOpen = ref(false);
const confirmAction = ref(''); // Acción seleccionada (desactivar, banear, eliminar)

const selectedItem = ref(null);

// TODO tengo que enviar las filas desde el componente padre
const rows = ref([]);

const confirmOptions = [
  {
    value: 'desactivar',
    label: "Desactivar " + props.title,
    sublabel: 'La desactivación de la cuenta es temporal, la playa estará oculta hasta que se reactive.',
  },
  {
    value: 'eliminar',
    label: "Eliminar " + props.title,
    sublabel: 'La eliminación de la playa es definitiva.',
  },
];

const actions = {
  openAddDialog: () => {
    // TODO solo quedarme con el reseteo de los datos, el otro es para hacer inserts mas rapidos
    formData.value = {};
    dialogMode.value = 'add';
    dialogOpen.value = true;
  },
  deleteSelected: () => {
    rows.value = rows.value.filter(row => !row.selected);
  },
};


const closeDialog = () => {
  dialogOpen.value = false;
};

// Creamos un emit para hacer el CRUD con el servidor desde el componente padre
const definirEmit = defineEmits(['saveFormularioAdd', 'saveFormularioEdit', 'eliminarRegistro']); // defineEmits: Declara los eventos que un componente puede emitir a su componente padre.


const saveItem = () => {
  console.log("Objeto que se emitirá desde ManagerGeneral:", formData.value);

  if (dialogMode.value === 'add') {
    definirEmit('saveFormularioAdd', formData.value); // Emite el objeto al componente padre
  } else {
    definirEmit('saveFormularioEdit', formData.value); // Emite en caso de edición
  }
  dialogOpen.value = false;
};


// Lógica genérica para editar un elemento
const editItem = (row) => {
  formData.value = { ...row };
  dialogMode.value = 'edit';
  dialogOpen.value = true;
};

// Lógica genérica para confirmar eliminación
const confirmDeleteItem = (row) => {
  selectedItem.value = row;
  confirmDialogOpen.value = true;
};

// Procesa la acción confirmada
const processDeleteAction = async (action) => {
  if (action === 'eliminar') {
    console.log("Objeto que se emitirá desde ManagerGeneral:", selectedItem.value);
    definirEmit('eliminarRegistro',selectedItem.value); // Emite el objeto al componente padre
  }
  confirmDialogOpen.value = false;
};

const cancelDeleteAction = () => {
  confirmDialogOpen.value = false;
};




</script>
<template>
    <CrudTable
      :title="title"
      :rows="filasTabla"
      :columns="columnaTabla"
      :actions="actions"
      @edit-row="editItem"
      @delete-row="confirmDeleteItem"
    />

    <q-dialog v-model="dialogOpen" full-width>
      <Form
        :formData="formData"
        :fields="fieldsToForm"
        :isEdit="dialogMode === 'edit'"
        :title="title"
        @saveFormulario="saveItem"
        @cancelFormulario="closeDialog"
      />
    </q-dialog>

    <ConfirmDialog
      v-model="confirmDialogOpen"
      :title="`¿Qué acción deseas realizar con el/la ${title}?`"
      :message="`Elige una opción para el/la ${title.toLowerCase()}: ${(selectedItem?.nombre || '')}`"
      :options="confirmOptions"
      @confirm="processDeleteAction"
      @cancel="cancelDeleteAction"
    />
</template>
