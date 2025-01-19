<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderAndDrawer/>

    <CrudTable
      :title="title"
      :rows="rows"
      :columns="columns"
      :actions="actions"
      @edit-row="editItem"
      @delete-row="confirmDeleteItem"
    />

    <q-dialog v-model="dialogOpen" full-width>
      <Formulario
        :formData="formData"
        :fields="fields"
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
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import HeaderAndDrawer from 'components/HeaderAndDrawer.vue';
import CrudTable from 'components/CrudTable.vue';
import Formulario from 'components/Formulario.vue';
import ConfirmDialog from 'components/ConfirmDialog.vue';

const props = defineProps({
  title: { type: String, required: true }, // Título genérico (e.g., "Playa", "Usuario", "Ruta")
  fields: { type: Array, required: true }, // Campos del formulario
  columns: { type: Array, required: true }, // Columnas de la tabla
  service: { type: Object, required: true }, // Servicio para CRUD
});

const dialogMode = ref('add');
const dialogOpen = ref(false);
const confirmDialogOpen = ref(false);
const selectedItem = ref(null);
const formData = ref({});
const rows = ref([]);
const confirmOptions = [
  { value: 'desactivar', label: 'Desactivar', sublabel: 'Desactiva el elemento temporalmente.' },
  { value: 'eliminar', label: 'Eliminar', sublabel: 'Elimina el elemento permanentemente.' },
];

const actions = {
  openAddDialog: () => {
    formData.value = {}; // Resetea los datos del formulario
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

// Lógica genérica para guardar un elemento
const saveItem = async () => {
  if (dialogMode.value === 'add') {
    const newItem = { id: rows.value.length + 1, ...formData.value };
    rows.value.push(newItem);
    if (service.create) await service.create(newItem); // Llama al servicio si está definido
  } else {
    const index = rows.value.findIndex(row => row.id === formData.value.id);
    if (index !== -1) {
      rows.value[index] = { ...formData.value };
      if (service.update) await service.update(formData.value); // Llama al servicio si está definido
    }
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
    rows.value = rows.value.filter(row => row.id !== selectedItem.value.id);
    if (service.delete) await service.delete(selectedItem.value.id); // Llama al servicio si está definido
  }
  confirmDialogOpen.value = false;
};

const cancelDeleteAction = () => {
  confirmDialogOpen.value = false;
};

// Obtiene los datos iniciales
const getItems = async () => {
  if (service.getAll) rows.value = await service.getAll();
};
getItems();
</script>
