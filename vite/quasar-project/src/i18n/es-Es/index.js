// This is just an example,
// so you can safely delete all default props below

export default {
  hello: "¡Hola Mundo!",
  welcome: "Bienvenido a mi aplicación",
  logout: "Cerrar sesión",

  indexPage: {
    title: "Panel del Administrador",
  },

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
  },

  routePage: {
    managerGeneral: {
      title: "Ruta",
    },
    fieldsFormulario: {
      name: "Nombre de la Ruta",
      zona: "Zona",
      descripcion: "Descripción",
      paginaWeb: "Página Web (URL)",
      fotos: "URLs de Fotos",
      tipoRuta: "Tipo de Ruta",
      private: "Privada",
      estado: "Estado de la Ruta",
      rules: {
        required: "Campo obligatorio",
        urlInvalid: "Debe ser una URL válida",
        selectAtLeastOneType: "Seleccione al menos un tipo de ruta",
        invalidList: "Debe ser una lista de URLs válidas"
      }

    },
    routeColumns: {
      select: "Seleccionar",
      id: "ID",
      localizacion: "Localización",
      name: "Nombre de Ruta",
      map: "Mapa",
      zona: "Zona",
      paginaWeb: "Página Web",
      seePage: "Ver Página",
      noWebsite: "Sin página web",
      fotos: "Fotos",
      photosAvailable: "foto(s) disponibles",
      noPhotos: "No hay fotos",
      descripcion: "Descripción",
      denuncias: "Denuncias",
      distance: "Distancia",
      duration: "Duración",
      elevation: "Desnivel",
      valoracion: "Valoración",
      private: "Privada",
      accion: "Acción"
    }
  },


  mainLayout: {
    title: "Mallorca Playa",
    selectLanguage: "Seleccionar Idioma",
    admin: "Panel de Administración",
  },

  roleRequestPage: {
    managerGeneral: {
      title: "Solicitud de Rol",
    },
    rolesColumns: {
      select: "Seleccionar",
      id: "ID",
      user: "Usuario",
      role: "Rol",
      urlPhotoDni: "Foto DNI",
      urlOfficialDoc: "Documento Oficial",
      approved: "Aprobado",
      accion: "Acción"
    }

  },

  linksList: {
    home: {
      title: "Inicio",
      caption: "Página principal"
    },
    user: {
      title: "Gestionar Usuario",
      caption: "CRUD Usuario"
    },
    roles: {
      title: "Gestionar Roles",
      caption: "CRUD"
    },
    beaches: {
      title: "Gestionar Playas",
      caption: "CRUD Playas"
    },
    routes: {
      title: "Gestionar Rutas",
      caption: "CRUD Rutas"
    },
    roleRequests: {
      title: "Gestionar Aprobaciones",
      caption: "@QuasarFramework"
    },
    complaints: {
      title: "Administrar Denuncias",
      caption: "Community Quasar projects"
    },
    events: {
      title: "Gestionar Eventos",
      caption: "Community Quasar projects"
    },
    pointsOfInterest: {
      title: "Puntos Globales",
      caption: "Community Quasar projects"
    },

    translateQuasarPage:{
      title: "Traducir elementos de Quasar",
      caption: "Enviar un JSON a Spring para traducción dinámica"
    }
  },


};
