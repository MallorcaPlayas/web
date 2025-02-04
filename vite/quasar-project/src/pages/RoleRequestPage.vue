<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {FunctionService} from 'src/service/FunctionService.js';
import {onMounted, ref} from "vue";
import {RoleService} from "src/service/RoleService.js";
import {RoleRequestService} from "src/service/RoleRequestService.js";

const roleRequestService = new RoleRequestService()

const rows = ref([]);

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
    name: 'user',
    label: 'Usuario',
    field: 'user',
    sortable: false
  },
  {
    name: 'role',
    label: 'Rol',
    field: 'role',
    sortable: false
  },
  {
    name: 'urlPhotoDni',
    label: 'Photo DNI',
    field: 'urlPhotoDni',
    sortable: false
  },
  {
    name: 'urlOfficialDoc',
    label: 'Official Doc',
    field: 'urlOfficialDoc',
    sortable: false
  },
  {
    name: 'approved',
    label: 'Aprobado',
    field: 'approved',
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

</script>

<template>
  <ManagerGeneral
    v-if="rows.length > 0"
    title="Solicitudes de roles"
    :columns="rolesColumns"
    :rows="rows"/>
</template>
