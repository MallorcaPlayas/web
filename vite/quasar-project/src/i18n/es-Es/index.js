// This is just an example,
// so you can safely delete all default props below

export default {
  hello: "¡Hola Mundo!",
  welcome: "Bienvenido a mi aplicación",
  logout: "Cerrar sesión",

  userPage: {
    managerGeneral: {
      title: "Usuario",
    },
    columnsAA: {
      userName: "Nombre Usuario",
      name: "Nombre",
      firstSurname: "Primer Apellido",
      secondSurname: "Segundo Apellido",
      email: "Email",
      birthday: "Fecha Nacimiento",
      urlPhoto: "Foto Perfil",
      privatePrivacy: "Visibilidad",
      state: "Estado",
      roles: "Rol",
      accion: "Acción"
    },
    fieldsFormulario: {
      userName: "Nombre de Usuario",
      name: "Nombre",
      firstSurname: "Primer Apellido",
      secondSurname: "Segundo Apellido",
      email: "Email",
      birthday: "Fecha de Nacimiento",
      urlPhoto: "Foto de Perfil",
      privatePrivacy: "Visibilidad",
      roles: "Rol",
      state: "Estado",
      rules: {
        required: "Campo obligatorio",
        urlInvalid: "Debe ser una URL válida"
      }
    },
  },

  beachPage: {
    managerGeneral: {
      title: "Playa",
    },
    fieldsForm: {
      name: "Nombre de la Playa",
      municipio: "Municipio",
      description: "Descripción",
      types: "Tipo de Playa",
      services: "Servicios Playa",
      cameras: "Cámara Web (URL)",
      estado: "Estado de la Playa",
      rules: {
        required: "Campo obligatorio",
        selectAtLeastOne: "Seleccione al menos una opción",
        selectAtLeastOneService: "Seleccione al menos un servicio",
        urlInvalid: "Debe ser una URL válida",
        positiveNumber: "Debe ser un número positivo o cero"
      }
    },
    beachColumns: {
      select: "Seleccionar",
      id: "ID",
      name: "Nombre",
      municipio: "Municipio",
      description: "Descripción",
      services: "Servicios de Playa",
      types: "Tipo de Playa",
      fotos: "Fotos",
      cameras: "Cámara Web",
      empresaSocorrista: "Empresa de Socorrismo",
      denuncias: "Denuncias",
      paginaWeb: "Página Web",
      accion: "Acción",
      noPhotos: "No hay fotos",
      noCamera: "Sin cámara",
      noWebsite: "Sin página web",
      seeCamera: "Ver Cámara",
      seePage: "Ver Página"
    }
  },

  form: {
    input: {
      startTime: "Hora de Inicio",
      endTime: "Hora de Fin",
    },
    card: {
      edit: "Editar",
      add: "Agregar",
    },
    title: {
      servicesBeach: "Servicios de Playa",
      serviceBeach: "Servicio de Playa",
    },
    btn: {
      delete: "Eliminar",
      addService: "Añadir Servicio",
      addFunction: "Añadir Función",
      cancel: "Cancelar",
      save: "Guardar",
    },
    select: {
      rol: "Función Rol"
    }
  },

  managerGeneral: {
    ConfirmDialog: {
      title: "¿Qué acción deseas realizar con el/la {item}?",
      message: "Elige una opción para el/la {item}: {name}",
    },
    confirmOptions: {
      delete: "Eliminar {title}",
      disable: "Desactivar {title}",
    }
  },

  crudTable: {
    btn: {
      delete: "Eliminar {title}s Seleccionadas",
      add: "Agregar {title}",
      photos: "Ver Fotos",
      noPhotosAvailable: "No hay fotos disponibles",
      services: "Ver Servicios",
      map: "Ver Mapa",
    },
    card: {
      close: "Cerrar",

    },
    imgAltPerfil: "Foto Perfil",
    dialog: {
      beachServices: "Servicios de Playa",
      service: "Servicio",
      noName: "Sin Nombre",
      startTime: "Hora de Inicio",
      endTime: "Hora de Fin",
    },
    table: {
      title: "Gestionar {title}",
    }
  },
  confirmDialog: {
    btn: {
      cancel: "Cancelar",
      confirm: "Continuar"
    }
  },

  rolePage: {
    managerGeneral: {
      title: "Roles",
    },
    fieldsFormulario: {
      name: "Nombre de la Rol",
      description: "Descripción",
      functions: "Funciones",
      estado: "Estado del Rol",
      rules: {
        required: "Campo obligatorio",
        selectAtLeastOneFunction: "Seleccione al menos una función"
      }
    },
    rolesColumns: {
      select: "Seleccionar",
      id: "ID",
      name: "Nombre",
      description: "Descripción",
      functions: "Funciones",
      accion: "Acción",
      rules: {
        noName: "Sin nombre"
      }
    },
  }


};
