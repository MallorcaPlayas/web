<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {FunctionService} from 'src/service/FunctionService.js';
import {computed, onMounted, ref} from "vue";
import {RoleService} from "src/service/RoleService.js";
import {useI18n} from "vue-i18n";
const { t } = useI18n();


const roleService = new RoleService()
const functionService = new FunctionService()
const rows = ref([]);
const functions = ref();

const fieldsFormulario = computed(() => [
  {
    name: 'name',
    label: t("rolePage.fieldsFormulario.name"),
    rules: [val => !!val || t("rolePage.fieldsFormulario.rules.required")],
  },
  // {
  //   name: 'description',
  //   label: t("rolePage.fieldsFormulario.description"),
  //   rules: [val => !!val || t("rolePage.fieldsFormulario.rules.required")],
  //   type: 'textarea', // Puede ser tipo textarea para descripciones largas
  // },
  {
    name: 'functions',
    label: t("rolePage.fieldsFormulario.functions"),
    options: () => functions.value, // Opciones de servicios
    type: 'select',
    rules: [val => !!val || t("rolePage.fieldsFormulario.rules.selectAtLeastOneFunction")],
    multiple: true, // Permite múltiples selecciones
  },
  {
    name: 'estado',
    label: t("rolePage.fieldsFormulario.estado"),
    type: 'toggle',
  },
]);

const rolesColumns = computed(() => [
  {
    name: 'select',
    label: 'Select',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: t("rolePage.rolesColumns.id"),
    field: 'id',
    sortable: true,
    noMostrarID: false
  },
  {
    name: 'name',
    label: t("rolePage.rolesColumns.name"),
    field: 'name',
    sortable: true
  },
  // {
  //   name: 'description',
  //   label: t("rolePage.rolesColumns.description"),
  //   field: 'description',
  //   sortable: false
  // },
  {
    name: 'functions',
    label: t("rolePage.rolesColumns.functions"),
    field: 'functions', // Se espera que sea un array
    format: (val) =>
      val.map((functions) => {
        // console.log('Elemento functions:', functions); // Inspección de cada elemento
        return functions?.functionProj?.name || functions?.function?.name || t("rolePage.rolesColumns.rules.noName");
        // Un rol tiene una functions, que a su vez tiene una functionProj y esta está creada por FunctionProj
      }).join(', '),
    sortable: false
  },
  {
    name: 'accion',
    label: t("rolePage.rolesColumns.accion"),
    align: 'center',
    field: 'accion',
    sortable: false
  }
]);


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
    :title="t('rolePage.managerGeneral.title')"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="rolesColumns"
    :filasTabla="rows"
    @saveFormularioAdd="saveNewRole"
    @saveFormularioEdit="saveEditRole"
    @eliminarRegistro="deleteRole"
  />
</template>
