// This is just an example,
// so you can safely delete all default props below

export default {
  hello: "¡Hola Mundo!",
  welcome: "Bienvenido a mi aplicación",
  logout: "Cerrar sesión",

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
  }


};
