<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {serviceUser} from 'src/service/serviceUser.js'

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
  return emailPattern.test(email) || 'El email no tiene un formato válido';
};

const roles = ['Socorrista', 'Guía', 'Administrador'];

// metodo solo para mostrar los roles disponibles en el dialogo
const getRoles = () => {
  return roles;
};

const userFields = [
  {
    name: 'nombre_usuario',
    label: 'Nombre de Usuario',
    rules: [val => !!val || 'Campo obligatorio']
  },
  {name: 'nombre', label: 'Nombre', rules: [val => !!val || 'Campo obligatorio']},
  {name: 'primerApellido', label: 'Primer Apellido', rules: [val => !!val || 'Campo obligatorio']},
  {name: 'segundoApellido', label: 'Segundo Apellido', rules: [val => !!val || 'Campo obligatorio']},
  {
    name: 'email', // Identificador único del campo en el formulario. Se utiliza como clave para enlazar el valor del input con el objeto formDataUser, que almacena los datos del formulario y contiene un atributo con el mismo nombre.
    label: 'Email', // Etiqueta que se muestra al usuario en el formulario, describiendo el propósito del campo.
    rules: [validateEmail], // Reglas de validación del campo.
    type: 'email', // Especifica el tipo del input (en este caso, correo electrónico), lo que ayuda al navegador y al componente a tratar el campo adecuadamente.
  },
  {name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date'},
  {name: 'visibilidad', label: 'Visibilidad', type: 'toggle'},
  {name: 'roles', label: 'Rol', options: getRoles, type: 'select'},
  {name: 'estado', label: 'Estado', type: 'toggle'},
];

const columns = [
  {
    name: 'select',
    label: 'Select',
    align: 'center',
    field: row => row.selected,
    sortable: false // No es ordenable
  },
  {
    name: 'id', // nombre que usaremos para referirnos a esta columna internamete y usarla para ordenar
    label: 'Id', // Nombre de la columna
    align: 'center',
    field: 'id123', // La propiedad del objeto de datos que esta columna mostrará
    sortable: true
  },
  {
    name: 'usuario',
    label: 'Nombre Usuario',
    align: 'left',
    field: 'nombre_usuario',
    sortable: true
  },
  {
    name: 'nombre',
    label: 'Nombre',
    align: 'left',
    field: 'nombre',
    sortable: true
  },
  {
    name: 'primerApellido',
    label: 'Primer Apellido',
    align: 'left',
    field: 'primerApellido',
    sortable: true
  },
  {
    name: 'segundoApellido',
    label: 'Segundo Apellido',
    align: 'left',
    field: 'segundoApellido',
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'gmail',
    sortable: true
  },
  {
    name: 'fechaNacimiento',
    label: 'Fecha Nacimiento',
    align: 'left',
    field: 'fechaNacimiento',
    sortable: true
  },
  {
    name: 'urlFotoPerfil',
    label: 'Foto Perfil',
    align: 'left',
    field: 'urlFotoPerfil',
    sortable: true
  },
  {
    name: 'visibilidad',
    label: 'Visibilidad',
    align: 'left',
    field: 'visibilidad',
    sortable: true
  },
  {
    name: 'estado',
    label: 'Estado',
    align: 'left',
    field: 'estado',
    sortable: true
  },
  {
    name: 'roles',
    label: 'Rol',
    align: 'left',
    field: 'rolUser',
    sortable: true
  },
  {
    name: 'accion',
    label: 'Action',
    align: 'center',
    field: 'accion',
    sortable: false,
  }
];

</script>

<template>
  <ManagerGeneral
    title="Usuario"
    :fields="userFields"
    :columns="columns"
    :service="serviceUser"
  />
</template>
