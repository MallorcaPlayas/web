<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {FunctionService} from 'src/service/FunctionService.js';
import {onMounted, ref} from "vue";
import {RoleService} from "src/service/RoleService.js";
import {RoleRequestService} from "src/service/RoleRequestService.js";
import {ComplaintService} from "src/service/ComplaintService.js";

const complaintService = new ComplaintService()

const rows = ref([]);

const complaintsColumns = [
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
    name: 'message',
    label: 'Mensaje',
    field: 'message',
    sortable: false
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    sortable: false
  },
  {
    name: 'date',
    label: 'Fecha',
    field: 'date',
    sortable: false
  },
  {
    name: 'beach',
    label: 'Playa',
    field: 'beach',
    sortable: false
  },
  {
    name: 'route',
    label: 'Ruta',
    field: 'route',
    sortable: false
  },
  {
    name: 'user',
    label: 'Denunciador',
    field: 'user',
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
  const complaintsData = await complaintService.getAll()

  rows.value = complaintsData.map(complaint => ({
    id: complaint.id,
    message: complaint.message,
    status: complaint.status,
    date: complaint.date,
    beach: complaint.beach.name,
    route: complaint.route.name,
    user: complaint.user.email,
    selected: false
  }));
})

</script>

<template>
  <ManagerGeneral
    v-if="rows.length > 0"
    title="Solicitudes de roles"
    :columns="complaintsColumns"
    :rows="rows"/>
</template>
