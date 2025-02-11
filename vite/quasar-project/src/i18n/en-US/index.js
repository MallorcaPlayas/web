// This is just an example,
// so you can safely delete all default props below

export default {
  hello: "Hello World!",
  welcome: "Welcome to my application",
  logout: "Logout",

  beachPage: {
    managerGeneral: {
      title: "Beach",
    },
    fieldsForm: {
      name: "Beach Name",
      municipio: "Municipality",
      description: "Description",
      types: "Beach Type",
      services: "Beach Services",
      cameras: "Webcam (URL)",
      estado: "Beach Status",
      rules: {
        required: "Required field",
        selectAtLeastOne: "Select at least one option",
        selectAtLeastOneService: "Select at least one service",
        urlInvalid: "Must be a valid URL",
        positiveNumber: "Must be a positive number or zero"
      }
    },
    beachColumns: {
      select: "Select",
      id: "ID",
      name: "Name",
      municipio: "Municipality",
      description: "Description",
      services: "Beach Services",
      types: "Beach Type",
      fotos: "Photos",
      cameras: "Webcam",
      empresaSocorrista: "Lifeguard Company",
      denuncias: "Reports",
      paginaWeb: "Website",
      accion: "Action",
      noPhotos: "No photos",
      noCamera: "No camera",
      noWebsite: "No website",
      seeCamera: "View Camera",
      seePage: "View Page"
    }
  },

  form: {
    input: {
      startTime: "Start Time",
      endTime: "End Time",
    },
    card: {
      edit: "Edit",
      add: "Add",
    },
    title: {
      servicesBeach: "Beach Services",
      serviceBeach: "Beach Service",
    },
    btn: {
      delete: "Delete",
      addService: "Add Service",
      addFunction: "Add Function",
      cancel: "Cancel",
      save: "Save",
    },
    select: {
      rol: "Role Function"
    }
  },

  managerGeneral: {
    ConfirmDialog: {
      title: "What action do you want to perform with the {item}?",
      message: "Choose an option for the {item}: {name}",
    },
    confirmOptions: {
      delete: "Delete {title}",
      disable: "Disable {title}",
    }
  },

  crudTable: {
    btn: {
      delete: "Delete Selected {title}s",
      add: "Add {title}",
      photos: "View Photos",
      noPhotosAvailable: "No photos available",
      services: "View Services",
      map: "View Map",
    },
    card: {
      close: "Close",
    },
    imgAltPerfil: "Profile Picture",
    dialog: {
      beachServices: "Beach Services",
      service: "Service",
      noName: "No Name",
      startTime: "Start Time",
      endTime: "End Time",
    },
    table: {
      title: "Manage {title}",
    }
  },
  confirmDialog: {
    btn: {
      cancel: "Cancel",
      confirm: "Continue"
    }
  }
};
