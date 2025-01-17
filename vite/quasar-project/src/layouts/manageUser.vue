<template>
  <!-- q-layout: Define el diseño de la página, incluyendo secciones como encabezados,
  menús laterales, y la zona principal del contenido.
   view Define cómo se distribuyen las áreas del diseño (encabezado, barra lateral, pie de página, contenido)
   lHh: El encabezado está fijo
   Lpr: El menú lateral se superpone y puede ocultarse.-->
  <q-layout view="lHh Lpr lFf">
    <!--    Es el header-->
    <q-header elevated>
      <!--      toolbar es una barra de navegacción-->
      <q-toolbar>
        <!-- aria-label="Menu"  texto alternativo para las personas ciegas-->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Mallorca Playa
        </q-toolbar-title>

        <q-btn round>
          <q-avatar size="42px">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>


    <!--    El componente <q-drawer> se utiliza para crear un panel lateral que se puede ocultar y mostrar -->
    <!--    v-model -> Los cambios en los datos que se produce en el script o en el DOM se reflejan inmediatamente
     en ambas partes de forma automatica. Si leftDrawerOpen es = true se muestra, si es = false esta oculto-->
    <!--    -->
    <!-- Explicación del uso de v-bind:
    En lugar de escribir v-bind, puedes usar el alias corto : -->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Panel de Administración
        </q-item-label>
        <!-- v-bind ->   En lugar de pasar cada propiedad del objeto como una prop individual
         (ejemplo: :title="linkA.title", :caption="linkA.caption", etc.),
         v-bind="link" pasa todas las propiedades del objeto directamente.
          Esto es útil cuando tienes un objeto con muchas propiedades y quieres pasarlas todas a la vez.
          Las propiedades las tengo definidas ArrayEnlacesInternos.js. y los nombres que he definido
          en EssentialLink.vue son title, caption, link y icon y tiene que coincidir con los nombres
          de las propiedades del objeto que he definido en ArrayEnlacesInternos.js.
          -->

        <EssentialLink
          v-for="linkA in linksListBB"
          :key="linkA.title"
          v-bind="linkA"
        />
      </q-list>
    </q-drawer>

    <!-- Tabla CRUD -->
    <!--    Boton para agregar un usuario-->
    <div class="q-pa-md">
      <q-btn
        color="primary"
        icon="add"
        label="Agregar Usuario"
        class="q-mb-md q-mt-xl q-ml-xs"
        @click="openAddUserDialog"
      />
      <!-- Botón para eliminar usuarios seleccionados -->
      <q-btn
        color="negative"
        icon="delete"
        label="Eliminar Usuarios Seleccionados"
        class="q-mb-md q-mt-xl q-ml-md"
        @click="deleteSelectedUsers"
      />
      <q-table
        class="my-sticky-header-table"
        flat
        bordered
        title="Gestionar Usuarios"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <!--        Checkbox para seleccionar todos en el encabezado -->
        <template v-slot:header-cell-select>
          <q-checkbox v-model="selectAll"/>
        </template>
        <!-- Columna de selección -->
        <template v-slot:body-cell-select="props">
          <q-checkbox v-model="props.row.selected"/>
        </template>

        <!-- Columna de acciones -->
        <template v-slot:body-cell-accion="props">
          <q-btn
            flat
            color="primary"
            icon="edit"
            @click="editUser(props.row)"
          />
          <q-btn
            flat
            color="negative"
            icon="delete"
            @click="confirmDeleteUser(props.row)"
          />
        </template>
      </q-table>
    </div>

    <!-- Modal para agregar/editar usuarios -->


    <q-dialog v-model="dialogOpen" full-width> <!-- NUEVO: Modal para agregar/editar -->
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ dialogMode === 'edit' ? 'Editar Usuario' : 'Agregar Usuario' }}</div>
        </q-card-section>
        <q-card-section>
          <!--          campo obligatorio del input  de nombre de usuario-->

          <q-input v-model="formData.nombre_usuario"
                   label="Nombre de Usuario"
                   :rules="[val => !!val || 'Campo obligatorio']"
          />

          <q-input v-model="formData.nombre"
                   label="Nombre"
                   :rules="[val => !!val || 'Campo obligatorio']"
          />

          <q-input v-model="formData.primerApellido"
                   label="1r Apellido"
                   :rules="[val => !!val || 'Campo obligatorio']"
          />

          <q-input v-model="formData.segundoApellido"
                   label="2n Apellido"
                   :rules="[val => !!val || 'Campo obligatorio']"
          />

          <q-input v-model="formData.email" label="Email" :rules="[validateEmail]"/>


          <q-input v-model="formData.fechaNacimiento" label="Fecha Nacimiento" type="date"/>

          <q-uploader
            label="Foto Perfil"
            url="http://localhost:4444/upload"
            style="max-width: 300px"
          />

          <q-toggle class="q-mt-lg-xs" v-model="formData.visibilidad" label="Visibilidad"/>
          <!--          <q-input v-model="formData.visibilidad"-->
          <!--                   label="Visibilidad"-->
          <!--                   :rules="[val => !!val || 'Campo obligatorio']"-->
          <!--          />-->

          <q-select
            v-model="formData.roles"
            :options="getRoles()"
            label="Rol"
          />

          <q-toggle v-model="formData.estado" label="Estado"/>


        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="closeDialog"/>
          <q-btn flat color="primary" label="Guardar" @click="saveUser"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDialogOpen">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">¿Qué acción deseas realizar?</div>
          <p>Elige una opción para el usuario: {{ selectedUser?.nombre_usuario }}</p>
        </q-card-section>

        <q-card-section>
          <q-radio
            v-model="confirmAction"
            val="desactivar"
            label="Desactivar la cuenta"
            sublabel="La desactivación de la cuenta es temporal, el perfil estará oculto hasta que se reactive."
          />
          <q-radio
            v-model="confirmAction"
            val="banear"
            label="Banear la cuenta"
            sublabel="El usuario recibirá un aviso en el correo."
          />
          <q-radio
            v-model="confirmAction"
            val="eliminar"
            label="Eliminar la cuenta"
            sublabel="La eliminación de la cuenta es definitiva. Todo el perfil y contenido serán eliminados."
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" @click="confirmDialogOpen = false"/>
          <q-btn flat label="Continuar" color="primary" @click="processDeleteAction"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--    No entiendo que hace este componente!!! -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>


</template>

<script setup>
import {ref, computed, watch} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {linksListArray} from 'src/constantes/ArrayEnlacesInternos.js'
// Aunque linksListArray es un array normal, al pasarlo a ref, Vue hace que el array sea reactivo.
const linksListBB = ref(linksListArray) // Si se cambia algo dentro de linksListBB.value, Vue automáticamente actualizará cualquier parte del DOM que dependa de esa referencia

const leftDrawerOpen = ref(false) // definimo el v-model indicando que es una variable reactiva que tiene como valor inicial false

// estado para el diálogo de confirmación y datos relacionados
const confirmDialogOpen = ref(false); // Estado para abrir/cerrar el diálogo cuando borro a un usuario
const selectedUser = ref(null); // Usuario seleccionado para eliminar
const confirmAction = ref(''); // Acción seleccionada (desactivar, banear, eliminar)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

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
    // accion: 'edit'
  },
  {
    selected: false,
    id: 2,
    nombre_usuario: 'Alexandru',
    rolUser: 'Guía',
    fecha_caducidad: '01/01/2030',
    gmail: 'bb@gmail.com'
    // accion: 'edit'
  }
]);


const dialogOpen = ref(false); // NUEVO: Estado del modal
const dialogMode = ref('add'); // NUEVO: Modo del modal ('add' o 'edit')
const formData = ref({}); // NUEVO: Datos del formulario. Con {} estoy creando un objeto vacio
// const selectAll = ref(false); // Estado del checkbox "seleccionar todos"

// Función para seleccionar o deseleccionar todos los usuarios
const selectAll = computed({
  get: () => rows.value.length > 0 && rows.value.every(row => row.selected), // Todos seleccionados
  set: (value) => {
    rows.value.forEach(row => {
      row.selected = value; // Ajusta el estado de "selected" en todas las filas
    });
  }
});

watch(selectAll, (newValue) => {
  console.log("Seleccionar todos:", newValue);
});


const openAddUserDialog = () => {

  formData.value = {
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
};

const editUser = (row) => {
  formData.value = {...row}; // Copiar datos del usuario
  dialogMode.value = 'edit';
  dialogOpen.value = true;
};

const saveUser = () => {
  // Tengo que crear 2 metodos para especificar si estoy creando un usuario o si lo estoy editando
  if (dialogMode.value === 'add') {
    console.log("paso por aqui? estoy creando un usuario")
    const user = {
      name: formData.value.nombre_usuario,
      first_name: formData.value.nombre,
      last_name: formData.value.primerApellido, // Puedes usar un campo del formulario o valores predeterminados
      second_last_name: formData.value.segundoApellido,
      email: formData.value.email,
      birthday: formData.value.fechaNacimiento, // Puedes convertir la fecha del formulario
      urlPhoto: "http://example.com/photo.jpg",
      privatePrivacy: true, // Valor booleano
      state: formData.value.estado,
      // roles: ['Guía'] TODO: Implementar roles
    };

    const userService = new serviceUser();
    userService.saveUser(user);
    rows.value = [];

    getUsers();

  }else {
    const index = rows.value.findIndex(row => row.id === formData.value.id);
    if (index !== -1) {
      rows.value[index] = {...formData.value};
    }
  }
  dialogOpen.value = false;




};

const deleteUser = (row) => {
  rows.value = rows.value.filter(user => user.id !== row.id);
};

// Función para eliminar usuarios seleccionados
const deleteSelectedUsers = () => {
  rows.value = rows.value.filter(user => !user.selected); // para eliminar "Crea un nuevo array" filtrando a los usuarios con selected = false
  selectAll.value = false; // Reinicia el estado del checkbox "seleccionar todos"

};


// closeDialog: crear metodo para cancelar el dialogo
const closeDialog = () => {
  dialogOpen.value = false;
};

// Función para abrir el diálogo de confirmación al eliminar un usuario
const confirmDeleteUser = (user) => {
  selectedUser.value = user; // Guarda el usuario seleccionado
  confirmDialogOpen.value = true; // Abre el diálogo
};

// Función para procesar la acción seleccionada en el diálogo
const processDeleteAction = () => {
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
         return  user.id123 !==  selectedUser.value.id123
      }  );

      break;
    default:
      console.warn('No se seleccionó una acción válida');
  }

  confirmDialogOpen.value = false; // Cierra el diálogo al terminar
};

// cuando este agregando o modificando un usuario, el dialogo se abre y solo puedo seleccionar 3 tipos de roles: Socorrista, Guía, Administrador

const roles = ['Socorrista', 'Guía', 'Administrador'];

// metodo solo para mostrar los roles disponibles en el dialogo
const getRoles = () => {
  return roles;
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
  return emailPattern.test(email) || 'El email no tiene un formato válido';
};

// importamos el servicio de usuario
import {serviceUser} from 'src/service/serviceUser.js'


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
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #00b4ff

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */



  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */



  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
