<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {computed, onMounted, ref} from "vue";
import {RoleService} from "src/service/RoleService.js";
import {RoleRequestService} from "src/service/RoleRequestService.js";
import {useI18n} from 'vue-i18n';
import {RoleRequestAprovalOrReject} from "src/model/role/RoleRequestAprovalOrReject.js";

const {t} = useI18n();
const roleRequestService = new RoleRequestService()

const rows = ref([]);

const rolesColumns = computed(() => [
  {
    name: 'select',
    label: t("roleRequestPage.rolesColumns.select"),
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id',
    label: t("roleRequestPage.rolesColumns.id"),
    field: 'id',
    sortable: true,
    noMostrarID: false
  },
  {
    name: 'user',
    label: t("roleRequestPage.rolesColumns.user"),
    field: 'user',
    sortable: false
  },
  {
    name: 'role',
    label: t("roleRequestPage.rolesColumns.role"),
    field: 'role',
    sortable: false
  },
  {
    name: 'urlPhotoDni',
    label: t("roleRequestPage.rolesColumns.urlPhotoDni"),
    field: 'urlPhotoDni',
    sortable: false
  },
  {
    name: 'urlOfficialDoc',
    label: t("roleRequestPage.rolesColumns.urlOfficialDoc"),
    field: 'urlOfficialDoc',
    sortable: false
  },
  {
    name: 'approved',
    label: t("roleRequestPage.rolesColumns.approved"),
    field: 'approved',
    sortable: false
  },
  {
    name: 'accion',
    label: t("roleRequestPage.rolesColumns.accion"),
    align: 'center',
    field: 'accion',
    sortable: false
  }
]);

const fieldsToForm = ref([
  {
    name: 'user',
    label: t("form.label.user"),
    type: 'text',
    rules: [val => !!val || t("form.rules.required")]
  },
  {
    name: 'role',
    label: t("form.label.role"),
    type: 'select',
    options: [
      { id: 1, name: "Guía" }
    ],
    rules: [val => !!val || t("form.rules.required")]
  },
  {
    name: 'urlPhotoDni',
    label: t("form.label.urlPhotoDni"),
    type: 'text',
    rules: []
  },
  {
    name: 'urlOfficialDoc',
    label: t("form.label.urlOfficialDoc"),
    type: 'text',
    rules: []
  },
  {
    name: 'approved',
    label: t("form.label.approved"),
    type: 'toggle'
  }
]);

onMounted(async () => {
  const roleRequestsData = await roleRequestService.getAll()

  rows.value = roleRequestsData.map(roleRequest => ({
    id: roleRequest.id,
    user: roleRequest.user,
    role: roleRequest.role,
    urlPhotoDni: roleRequest.urlPhotoDni,
    urlOfficialDoc: roleRequest.urlOfficialDoc,
    approved: roleRequest.approved,
    selected: false,
  }));
})

const saveEditRoleRequest = (rol) => {
  const roleRequestAprovalOrReject1 = new RoleRequestAprovalOrReject(rol.id, rol.approved)
  roleRequestService.updateRequestApproval(roleRequestAprovalOrReject1)
}

</script>

<template>
  <ManagerGeneral
    v-if="rows.length > 0"
    :title="t('roleRequestPage.managerGeneral.title')"
    :columnaTabla="rolesColumns"
    :fieldsToForm="fieldsToForm"
    :filasTabla="rows"
    @saveFormularioEdit="saveEditRoleRequest"
  />

</template>
