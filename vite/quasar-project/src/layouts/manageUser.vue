<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {ServiceUser} from 'src/service/ServiceUser.js'
import {onMounted, ref} from "vue";
import Formulario from "components/Formulario.vue";
import { date } from 'quasar'

// Varibles de entorno que he aprendido con Joan.
const variableEntorno=  process.env.SALUTACIO2;

console.log("Crear varaibles de entornos que definimos en -> .env.dev", variableEntorno);

const rows = ref([]);

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
  return emailPattern.test(email) || 'El email no tiene un formato válido';
};

const roles = ['Socorrista', 'Guía', 'Administrador'];

// metodo solo para mostrar los roles disponibles en el dialogo
const getRoles = () => {
  return roles;
};

const fieldsFormulario = [
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
  {
    name: 'urlFotoPerfil',
    label: 'Foto de Perfil',
    rules: [
      val => !!val || 'Este campo es obligatorio', // Valida que el campo no esté vacío
      val => val.startsWith('http') || 'Debe ser una URL válida' // Valida que sea una URL empiece por http
    ],
    type: 'url' // Especifica que es un campo de URL
  },

  {name: 'visibilidad', label: 'Visibilidad', type: 'toggle'},
  {name: 'roles', label: 'Rol', options: getRoles, type: 'select'},
  {name: 'estado', label: 'Estado', type: 'toggle'},
];

const columnsAA = [
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
    sortable: true,
    noMostrarID: false // si comento esto, podre ver el id en la tabla
  },
  {
    name: 'usuario',
    label: 'Nombre Usuario',
    align: 'left',
    field: 'nombre_usuario',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'nombre',
    label: 'Nombre',
    align: 'left',
    field: 'nombre',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'primerApellido',
    label: 'Primer Apellido',
    align: 'left',
    field: 'primerApellido',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'segundoApellido',
    label: 'Segundo Apellido',
    align: 'left',
    field: 'segundoApellido',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'email22', // lo usaremos para:  <template v-slot:body-cell-email22="props">
    label: 'Email',
    align: 'left',
    field: 'gmail',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'fechaNacimiento',
    label: 'Fecha Nacimiento',
    align: 'left',
    field: 'fechaNacimiento',
    type: 'date',
    format: val => date.formatDate(val, 'DD-MM-YYYY'), // Formatea la fecha, tengo que importar "date" de quasar
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'urlFotoPerfil',
    label: 'Foto Perfil',
    align: 'left',
    field: 'urlFotoPerfil',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'visibilidad',
    label: 'Visibilidad',
    align: 'left',
    field: 'visibilidad',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'estado',
    label: 'Estado',
    align: 'left',
    field: 'estado',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'roles',
    label: 'Rol',
    align: 'left',
    field: 'rolUser',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'accion',
    label: 'Action',
    align: 'center',
    field: 'accion',
    sortable: false
  }
];



// metodo para obtener los usuarios

const service = new ServiceUser()

const getUsers = async () => {
  // Actualiza las filas
  rows.value.splice(0, rows.value.length); // Vaciar el array sin perder la referencia reactiva
  const allUser = await service.getAllUser();


  if (allUser && Array.isArray(allUser)) { // allUser comprueba  Comprueba si la variable contiene datos
    // Mapea los datos recibidos y los asigna a rows
    rows.value = allUser.map(user => ({

      selected: false,
      id123: user.id,
      nombre_usuario: user.nombreUsuario,
      nombre: user.nombre,
      primerApellido: user.primerApellido,
      segundoApellido: user.segundoApellido,
      email: user.email,
      fechaNacimiento: user.fechaNacimiento,
      urlFotoPerfil: user.urlFotoPerfil,
      visibilidad: user.visibilidad,
      rolUser: 'Guía',
      estado: user.estado,
      gmail: user.email,

    }));
  } else {
    console.warn("No se recibieron datos válidos.");
  }

};

const saveUser = async(user) => {
  console.log("Objeto recibido en saveUser:", user);

  await service.saveUser(plantillaEnviarNuevoUsuarioApi(user)); // Envía el objeto recibido al servicio


  await getUsers(); // Recargar los usuarios
};

const plantillaEnviarNuevoUsuarioApi = (formDataUser) => {
  return {
    name: formDataUser.nombre_usuario,
    first_name: formDataUser.nombre,
    last_name: formDataUser.primerApellido, // Puedes usar un campo del formulario o valores predeterminados
    second_last_name: formDataUser.segundoApellido,
    email: formDataUser.email,
    birthday: formDataUser.fechaNacimiento, // Puedes convertir la fecha del formulario
    urlPhoto: formDataUser.urlFotoPerfil,
    privatePrivacy: true, // Valor booleano
    state: formDataUser.estado,
    // roles: ['Guía'] TODO: Implementar roles
  };
}

const saveEditUser = async (user) => {
  console.log("Objeto recibido en saveEditUser:", user);
  await service.updateUser(plantillaEnviarUsuarioEditoApi(user));
  await getUsers();
}

const plantillaEnviarUsuarioEditoApi = (formDataUser) => {
  return {
    id: formDataUser.id123,
    name: formDataUser.nombre_usuario,
    first_name: formDataUser.nombre,
    last_name: formDataUser.primerApellido, // Puedes usar un campo del formulario o valores predeterminados
    second_last_name: formDataUser.segundoApellido,
    email: formDataUser.email,
    birthday: formDataUser.fechaNacimiento, // Puedes convertir la fecha del formulario
    urlPhoto: formDataUser.urlFotoPerfil,
    privatePrivacy: true, // Valor booleano
    state: formDataUser.estado,
    // roles: ['Guía'] TODO: Implementar roles
  };
}

const deleteUser = (user) => {
  console.log("Objeto recibido en deleteUser:", user);
  service.deleteUser(user.id123);

  getUsers();
}

// ¿Cuándo usar onMounted?
/*onMounted() se asegura de que el código dentro de este mét_odo se ejecute
únicamente después de que el componente haya sido montado en el DOM y la parte
visual esté lista. Es útil para inicializar datos, configurar listeners, o
realizar acciones relacionadas con el DOM, ya que garantiza que tod_o
 el contenido visual ya esté disponible.

Por ejemplo, si necesitas cargar datos de una API para mostrar en la interfaz,
 usarías onMounted() para asegurarte de que la llamada ocurre después
 de que el componente sea visible.
*
* */

onMounted(() => {
  getUsers();
});



</script>

<template>
  <ManagerGeneral
    title="Usuario"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="columnsAA"
    :filasTabla="rows"
    @saveFormularioAdd="saveUser"
    @saveFormularioEdit="saveEditUser"
    @eliminarRegistro="deleteUser"
  />
</template>
