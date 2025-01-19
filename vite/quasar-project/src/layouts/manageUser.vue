<template>
  <!-- q-layout: Define el diseño de la página, incluyendo secciones como encabezados,
  menús laterales, y la zona principal del contenido.
   view Define cómo se distribuyen las áreas del diseño (encabezado, barra lateral, pie de página, contenido)
   lHh: El encabezado está fijo
   Lpr: El menú lateral se superpone y puede ocultarse.-->
  <q-layout view="lHh Lpr lFf">
    <!--    Es el header-->
    <!-- Vinculamos la propiedad "panelLateral" del componente hijo con "menuLateral" del padre.
        Escuchamos el evento "toggleDrawer1" emitido por el hijo y
        llamamos a la función "abrirCerrarMenu" en el padre.-->
    <HeaderAndDrawer/>

    <CrudTable
      title="Usuario"
      :rows="rows"
      :columns="columns"
      :actions="userActions"
      @edit-row="editUser"
      @delete-row="confirmDeleteUser"
    />

    <!-- Modal para agregar/editar usuarios -->
    <!-- Explicación: :isEdit="dialogMode === 'edit'"
        Si esta expresión es verdadera dialogMode === 'edit'" enviara True al componente hijo
        El componente hijo tiene como defecto False, eso implica que por defecto
        saldra el mensaje de añadir-->
    <q-dialog v-model="dialogOpen" full-width>
      <Formulario
        :formData="formDataUser"
        :fields="userFields"
        :isEdit="dialogMode === 'edit'"
        title="Usuario"
        @save="saveUser"
        @cancel="closeDialog"
      />
    </q-dialog>

    <ConfirmDialog
      v-model="confirmDialogOpen"
      title="¿Qué acción deseas realizar?"
      :message="'Elige una opción para el usuario: ' + (selectedUser?.nombre_usuario || '')"
      :options="confirmOptions"
      @confirm="processDeleteAction"
      @cancel="cancelDeleteAction"
    />

    <!--    No entiendo que hace este componente!!! -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>


</template>

<script setup>
import {ref, computed, watch} from 'vue'
import HeaderAndDrawer from "components/HeaderAndDrawer.vue";

// importamos el servicio de usuario
import {serviceUser} from 'src/service/serviceUser.js'
import {User} from "src/model/User.js";
import CrudTable from "components/CrudTable.vue";
import Formulario from "components/Formulario.vue";
import ConfirmDialog from "components/ConfirmDialog.vue";


// estado para el diálogo de confirmación y datos relacionados
const confirmDialogOpen = ref(false); // Estado para abrir/cerrar el diálogo cuando borro a un usuario
const selectedUser = ref(null); // Usuario seleccionado para eliminar
const confirmAction = ref(''); // Acción seleccionada (desactivar, banear, eliminar)
const dialogOpen = ref(false); // NUEVO: Estado del modal
const dialogMode = ref('add'); // NUEVO: Modo del modal ('add' o 'edit')
const formDataUser = ref({}); // NUEVO: Datos del formulario. Con {} estoy creando un objeto vacio
// const selectAll = ref(false); // Estado del checkbox "seleccionar todos"


// Opciones del diálogo
const confirmOptions = [
  {
    value: 'desactivar',
    label: 'Desactivar la cuenta',
    sublabel: 'La desactivación de la cuenta es temporal, el perfil estará oculto hasta que se reactive.',
  },
  {
    value: 'banear',
    label: 'Banear la cuenta',
    sublabel: 'El usuario recibirá un aviso en el correo.',
  },
  {
    value: 'eliminar',
    label: 'Eliminar la cuenta',
    sublabel: 'La eliminación de la cuenta es definitiva. Todo el perfil y contenido serán eliminados.',
  },
];

const cancelDeleteAction = () => {
  console.log('Cancelando acción de eliminación');
};

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
  {name: 'nombre_usuario', label: 'Nombre de Usuario', rules: [val => !!val || 'Campo obligatorio']},
  {name: 'nombre', label: 'Nombre', rules: [val => !!val || 'Campo obligatorio']},
  {name: 'primerApellido', label: 'Primer Apellido', rules: [val => !!val || 'Campo obligatorio']},
  {name: 'segundoApellido', label: 'Segundo Apellido', rules: [val => !!val || 'Campo obligatorio']},
  {name: 'email', label: 'Email', rules: [validateEmail], type: 'email'},
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

// Datos de las filas
const rows = ref([
  {
    selected: false, // Estado del checkbox
    id: 1,
    nombre_usuario: 'Guido Figueroa',
    rolUser: 'Socorrista',
    fecha_caducidad: '12/12/2026',
    gmail: 'a@gmail.com'

  },
  {
    selected: false,
    id: 2,
    nombre_usuario: 'Alexandru',
    rolUser: 'Guía',
    fecha_caducidad: '01/01/2030',
    gmail: 'bb@gmail.com'
  }
]);

const openAddUserDialog = () => {

  formDataUser.value = {
    nombre_usuario: 'UsuarioPredefinido', nombre: 'Guido', primerApellido: 'Figueroa',
    segundoApellido: 'Castro',
    email: 'guidofigueroa96@gmail.com',
    fechaNacimiento: '1999-01-01', urlFotoPerfil: '',
    visibilidad: true,
    roles: 'Guía',
    estado: true
  }; // Creando un objeto con estos atributos
  dialogMode.value = 'add'; // Modo de diálogo: agregar
  dialogOpen.value = true; // Abrir diálogo

  console.log("componente padre: ", formDataUser.value.nombre_usuario);
};


// Función para eliminar usuarios seleccionados
const deleteSelectedUsers = () => {
  rows.value = rows.value.filter(user => !user.selected); // para eliminar "Crea un nuevo array" filtrando a los usuarios con selected = false
  selectAll.value = false; // Reinicia el estado del checkbox "seleccionar todos"

};

const editUser = (row) => {
  console.log("paso por aqui? estoy editando un usuario")
  formDataUser.value = {...row}; // Copiar datos del usuario
  dialogMode.value = 'edit';
  dialogOpen.value = true;
};

// Función para abrir el diálogo de confirmación al eliminar un usuario
const confirmDeleteUser = (user) => {
  selectedUser.value = user; // Guarda el usuario seleccionado
  confirmDialogOpen.value = true; // Abre el diálogo
  confirmAction.value = ''; // Limpia la acción seleccionada previamente
};

const userActions = {
  openAddDialog: openAddUserDialog,
  deleteSelected: deleteSelectedUsers,
};


const saveUser = () => {
  console.log("EEYYYY")
  // Tengo que crear 2 metodos para especificar si estoy creando un usuario o si lo estoy editando
  if (dialogMode.value === 'add') {
    console.log("paso por aqui? estoy creando un usuario")
    const user = {
      name: formDataUser.value.nombre_usuario,
      first_name: formDataUser.value.nombre,
      last_name: formDataUser.value.primerApellido, // Puedes usar un campo del formulario o valores predeterminados
      second_last_name: formDataUser.value.segundoApellido,
      email: formDataUser.value.email,
      birthday: formDataUser.value.fechaNacimiento, // Puedes convertir la fecha del formulario
      urlPhoto: "http://example.com/photo.jpg",
      privatePrivacy: true, // Valor booleano
      state: formDataUser.value.estado,
      // roles: ['Guía'] TODO: Implementar roles
    };

    const userService = new serviceUser();
    userService.saveUser(user);
    // TODO: no me agrege el usuario a la lista. Tengo que refrecar la pagina para ver el nuevo insert
    rows.value.splice(0, rows.value.length); // vaciar el array sin perferir la referencia de reactividad
    getUsers();

  } else {
    const index = rows.value.findIndex(row => row.id123 === formDataUser.value.id123);
    if (index !== -1) {
      rows.value[index] = {...formDataUser.value};// [operador de propagación "..."] creas un nuevo objeto, copiando las propiedades de formDataUser.value pero manteniéndolos como objetos independientes. Es decir, si modifico un objeto como apuntan a diferente parte de la memoria no se modifica el otro objeto ya que son independientes
      // actualizar el usuario en el servidor
      const usuario = createUSerFromForm();
      console.log("paso por aqui? estoy editando un usuario", usuario)
      service.updateUser(usuario);
    }
  }
  dialogOpen.value = false;
};

const createUSerFromForm = () => {
  return {
    id: formDataUser.value.id123,
    name: formDataUser.value.nombre_usuario,
    first_name: formDataUser.value.nombre,
    last_name: formDataUser.value.primerApellido, // Puedes usar un campo del formulario o valores predeterminados
    second_last_name: formDataUser.value.segundoApellido,
    email: formDataUser.value.email,
    birthday: formDataUser.value.fechaNacimiento, // Puedes convertir la fecha del formulario
    urlPhoto: "http://example.com/photo.jpg",
    privatePrivacy: true, // Valor booleano
    state: formDataUser.value.estado,
    // roles: ['Guía'] TODO: Implementar roles
  };
}


// closeDialog: crear metodo para cancelar el dialogo
const closeDialog = () => {
  dialogOpen.value = false;
};


// Función para procesar la acción seleccionada en el diálogo
const processDeleteAction = (action) => {
  confirmAction.value = action; // Actualiza la acción seleccionada
  console.log("hola booorro")

  switch (confirmAction.value) {
    case 'desactivar':
      console.log(`Desactivando al usuario ${selectedUser.value.nombre_usuario}`);
      // Aquí puedes agregar la lógica para desactivar al usuario
      break;
    case 'banear':
      console.log(`Baneando al usuario ${selectedUser.value.nombre_usuario}`);
      // Aquí puedes agregar la lógica para banear al usuario
      break;
    case 'eliminar':
      console.log(`Eliminando al usuario ${selectedUser.value.nombre_usuario}`);
      // Lógica para eliminar al usuario del array
      service.deleteUser(selectedUser.value.id123);
      rows.value = rows.value.filter(user => {
        return user.id123 !== selectedUser.value.id123
      });

      break;
    default:
      console.warn('No se seleccionó una acción válida');
  }

  confirmDialogOpen.value = false; // Cierra el diálogo al terminar
};

// metodo para obtener los usuarios

const service = new serviceUser()

const getUsers = async () => {

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


getUsers();

</script>

<style lang="sass">

</style>
