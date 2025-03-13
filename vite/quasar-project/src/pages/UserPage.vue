<script setup>
import ManagerGeneral from "components/ManagerGeneral.vue";
import {UserService} from 'src/service/UserService.js'
import {computed, onMounted, ref} from "vue";
import { date } from 'quasar'
import {RoleService} from "src/service/RoleService.js";
import {OrganizationService} from "src/service/OrganizationService.js";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const rows = ref([]);

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar emails
  return emailPattern.test(email) || 'El email no tiene un formato válido';
};

const roles = ref([]);
const organizations = ref([]);

const fieldsFormulario = computed(() => [
  {
    name: 'userName',
    label: t("userPage.fieldsFormulario.userName"),
    rules: [val => !!val || t("userPage.fieldsFormulario.rules.required")]
  },
  {
    name: 'name',
    label: t("userPage.fieldsFormulario.name"),
    rules: [val => !!val || t("userPage.fieldsFormulario.rules.required")]
  },
  {
    name: 'firstSurname',
    label: t("userPage.fieldsFormulario.firstSurname"),
    rules: [val => !!val || t("userPage.fieldsFormulario.rules.required")]
  },
  {
    name: 'secondSurname',
    label: t("userPage.fieldsFormulario.secondSurname")
  },
  {
    name: 'email', // Identificador único del campo en el formulario. Se utiliza como clave para enlazar el valor del input con el objeto formDataUser, que almacena los datos del formulario y contiene un atributo con el mismo nombre.
    label: t("userPage.fieldsFormulario.email"), // Etiqueta que se muestra al usuario en el formulario, describiendo el propósito del campo.
    rules: [validateEmail], // Reglas de validación del campo.
    type: 'email' // Especifica el tipo del input (en este caso, correo electrónico), lo que ayuda al navegador y al componente a tratar el campo adecuadamente.
  },
  {
    name: 'birthday',
    label: t("userPage.fieldsFormulario.birthday"),
    type: 'date'
  },
  // {
  //   name: 'urlPhoto',
  //   label: t("userPage.fieldsFormulario.urlPhoto"),
  //   rules: [
  //     val => !!val || t("userPage.fieldsFormulario.rules.required"), // Valida que el campo no esté vacío
  //     val => val.startsWith('http') || t("userPage.fieldsFormulario.rules.urlInvalid") // Valida que sea una URL empiece por http
  //   ],
  //   type: 'url' // Especifica que es un campo de URL
  // },
  {
    name: 'privatePrivacy',
    label: t("userPage.fieldsFormulario.privatePrivacy"),
    type: 'toggle'
  },
  {
    name: 'roles',
    label: t("userPage.fieldsFormulario.roles"),
    options: roles,
    type: 'select'
  },
  {
    name: 'state',
    label: t("userPage.fieldsFormulario.state"),
    type: 'toggle'
  }
]);

const columnsAA = computed(() => [
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
    noMostrarID: false // si comento esto, podré ver el id en la tabla
  },
  {
    name: 'userName',
    label: t("userPage.columnsAA.userName"),
    align: 'left',
    field: 'userName',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'name',
    label: t("userPage.columnsAA.name"),
    align: 'left',
    field: 'name',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'firstSurname',
    label: t("userPage.columnsAA.firstSurname"),
    align: 'left',
    field: 'firstSurname',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'secondSurname',
    label: t("userPage.columnsAA.secondSurname"),
    align: 'left',
    field: 'secondSurname',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'email22', // lo usaremos para:  <template v-slot:body-cell-email22="props">
    label: t("userPage.columnsAA.email"),
    align: 'left',
    field: 'gmail',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'birthday',
    label: t("userPage.columnsAA.birthday"),
    align: 'left',
    field: 'birthday',
    type: 'date',
    format: val => date.formatDate(val, 'DD-MM-YYYY'), // Formatea la fecha, tengo que importar "date" de quasar
    sortable: true,
    columnaVisible: true
  },
  // {
  //   name: 'urlFotoPerfil',
  //   label: t("userPage.columnsAA.urlPhoto"),
  //   align: 'left',
  //   field: 'urlFotoPerfil',
  //   sortable: true,
  //   columnaVisible: true
  // },
  {
    name: 'privatePrivacy',
    label: t("userPage.columnsAA.privatePrivacy"),
    align: 'left',
    field: 'privatePrivacy',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'state',
    label: t("userPage.columnsAA.state"),
    align: 'left',
    field: 'state',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'roles',
    label: t("userPage.columnsAA.roles"),
    align: 'left',
    field: 'roles',
    sortable: true,
    columnaVisible: true
  },
  {
    name: 'accion',
    label: t("userPage.columnsAA.accion"),
    align: 'center',
    field: 'accion',
    sortable: false
  }
]);

const userService = new UserService()
const roleService = new RoleService()
const organizationService = new OrganizationService()

onMounted(async () => {
  const allUser = await userService.getAll();
  roles.value = await roleService.getAll();
  organizations.value = await organizationService.getAll();
  rows.value = allUser.map(user => ({
    selected: false,
    id123: user.id, // cambiar por simplemente id, no id123
    userName: user.userName,
    name: user.name,
    firstSurname: user.firstSurname,
    secondSurname: user.secondSurname,
    email: user.email, // quitar
    birthday: user.birthday,
    urlFotoPerfil: user.photo? user.photo.url : "",
    privatePrivacy: user.privatePrivacy,
    roles: user.roles,
    state: user.state,
    gmail: user.email, // ??? deberia ser simplemente email, no gmail
  }));
});

const saveUser = async(user) => {
  userService.saveUser(user)
};

const saveEditUser = async (user) => {
  userService.updateUser(user)
}

const deleteUser = (user) => {
  userService.deleteUser(user.id123);
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

</script>

<template>
  <ManagerGeneral
    :title="t('userPage.managerGeneral.title')"
    :fieldsToForm="fieldsFormulario"
    :columnaTabla="columnsAA"
    :filasTabla="rows"
    @saveFormularioAdd="saveUser"
    @saveFormularioEdit="saveEditUser"
    @eliminarRegistro="deleteUser"
  />
</template>
