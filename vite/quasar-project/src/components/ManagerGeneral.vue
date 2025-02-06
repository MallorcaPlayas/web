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
    formData.value = {}; // Resetea los datos del formulario
    // Para hacer inserts de Playa más rápido
    // formData.value = {
    //   nombre: 'Playa Ejemplo', // Nombre de la playa
    //   municipio: 'Sevilla', // Municipio donde se encuentra
    //   descripcion: 'Una playa ficticia para pruebas.', // Descripción breve
    //   tipoPlaya: ['Familiar', 'Surf'], // Tipos de playa, seleccionando varias opciones
    //   servicios: ['Duchas', 'Socorristas', 'Chiringuitos'], // Servicios disponibles
    //   fotos: ['https://example.com/foto1.jpg', 'https://example.com/foto2.jpg'], // URLs de fotos
    //   urlCamaraWeb: 'https://example.com/camara', // URL de la cámara web
    //   ubicacion: { lat: 36.7213, lon: -4.4217 }, // Ubicación con latitud y longitud
    //   empresaSocorrista: 'Safe Beach Co.', // Empresa de socorrismo responsable
    //   denuncias: 2, // Número de denuncias inicial
    //   paginaWeb: 'https://playa-ejemplo.com', // Página web de la playa
    //   anuncios: ['Descuento en sombrillas', 'Fiesta en la playa'], // Lista de anuncios
    //   estado: true, // Estado activo de la playa
    // };
    // para hacer los inserts de Ruta

    // formData.value = {
    //   nombre: 'ManagerGeneralInsertRapido', // Nombre de la ruta
    //   zona: 'Sierra Nevada', // Zona donde se encuentra
    //   descripcion: 'Una ruta ficticia para pruebas.', // Descripción breve
    //   fotos: ['https://example.com/ruta-foto1.jpg', 'https://example.com/ruta-foto2.jpg'], // URLs de fotos
    //   paginaWeb: 'https://ruta-ejemplo.com', // Página web de la ruta
    //   distancia: 8.5, // Longitud de la ruta en kilómetros
    //   desnivel: 500, // Desnivel acumulado en metros
    //   valoracion: 4.7, // Valoración promedio (de 0 a 5)
    //   tipoRuta: 'Senderismo', // Tipo de ruta
    //   dificultad: 'Intermedia', // Nivel de dificultad
    //   denuncias: 1, // Número de denuncias inicial
    //   estado: true, // Estado activo de la ruta
    // };
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
