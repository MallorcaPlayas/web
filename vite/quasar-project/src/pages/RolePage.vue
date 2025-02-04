<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {FunctionService} from 'src/service/FunctionService.js';
import {onMounted, ref} from "vue";
import {RoleService} from "src/service/RoleService.js";

const roleService = new RoleService()
const functionService = new FunctionService()
const rows = ref([]);
const functions = ref();

const fieldsFormulario = [
  {
    name: 'name',
    label: 'Nombre de la Rol',
    rules: [val => !!val || 'Campo obligatorio'],
  },
  {
    name: 'description',
    label: 'Descripción',
    rules: [val => !!val || 'Campo obligatorio'],
    type: 'textarea', // Puede ser tipo textarea para descripciones largas
  },
  {
    name: 'functions',
    label: 'Funciones',
    options: () => functions.value, // Opciones de servicios
    type: 'select',
    rules: [val => !!val || 'Seleccione al menos una funcion'],
    multiple: true, // Permite múltiples selecciones
  },
  {
    name: 'estado',
    label: 'Estado del Rol',
    type: 'toggle',
  },
];

const rolesColumns = [
  {
    name: 'select',
    label: 'Select',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    sortable: true,
    noMostrarID: false
  },
  {
    name: 'name',
    label: 'Nombre',
    field: 'name',
    sortable: true
  },
  {
    name: 'description',
    label: 'Descripción',
    field: 'description',
    sortable: false
  },
  {
    name: 'functions',
    label: 'Functiones',
    field: 'functions', // Se espera que sea un array
    format: (val) =>
      val.map((functions) => {
        // console.log('Elemento functions:', functions); // Inspección de cada elemento
        return functions?.functionProj?.name || functions?.function?.name || 'Sin nombre'; // Un rol tiene una functions, que a su vez tiene una functionProj y esta esta creada por FunctionProj
      }).join(', '),
    sortable: false
  },
  {
    name: 'accion',
    label: 'Acción',
    align: 'center',
    field: 'accion',
    sortable: false
  }
];

onMounted(async () => {
  const rolesData = await roleService.getAll()
  const functionsData = await functionService.getAll()


  functions.value = functionsData


  rows.value = rolesData.map(role => ({
    id: role.id,
    name: role.name,
    description: role.description,
    functions: role.functions,
    selected: false,
  }));
})

const saveNewRole = (newRole) => {
  roleService.create(newRole);
};

const saveEditRole = (role) => {
  roleService.update(role);
}

const deleteRole = (role) => {
  roleService.delete(role.id);
}


</script>

<template>
  <ManagerGeneral
    v-if="rows.length > 0"
    title="Roles"
    :fieldsForm="fieldsFormulario"
    :columns="rolesColumns"
    :rows="rows"
    @saveFormularioAdd="saveNewRole"
    @saveFormularioEdit="saveEditRole"
    @eliminarRegistro="deleteRole"
  />
</template>
