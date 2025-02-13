// This is just an example,
// so you can safely delete all default props below

export default {
  hello: "Hello World!",
  welcome: "Welcome to my application",
  logout: "Logout",

  indexPage: {
    title: "Admin Panel",
  },

  userPage: {
    managerGeneral: {
      title: "User",
    },
    columnsAA: {
      userName: "Username",
      name: "Name",
      firstSurname: "First Surname",
      secondSurname: "Second Surname",
      email: "Email",
      birthday: "Birth Date",
      urlPhoto: "Profile Picture",
      privatePrivacy: "Visibility",
      state: "State",
      roles: "Role",
      accion: "Action"
    },
    fieldsFormulario: {
      userName: "Username",
      name: "Name",
      firstSurname: "First Surname",
      secondSurname: "Second Surname",
      email: "Email",
      birthday: "Birth Date",
      urlPhoto: "Profile Picture",
      privatePrivacy: "Visibility",
      roles: "Role",
      state: "State",
      rules: {
        required: "Required field",
        urlInvalid: "Must be a valid URL"
      }
    },
  },

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
  },

  rolePage: {
    managerGeneral: {
      title: "Roles",
    },
    fieldsFormulario: {
      name: "Role Name",
      description: "Description",
      functions: "Functions",
      estado: "Role Status",
      rules: {
        required: "Required field",
        selectAtLeastOneFunction: "Select at least one function"
      }
    },
    rolesColumns: {
      select: "Select",
      id: "ID",
      name: "Name",
      description: "Description",
      functions: "Functions",
      accion: "Action",
      rules: {
        noName: "No name"
      }
    },
  },

  routePage: {
    managerGeneral: {
      title: "Route",
    },
    fieldsFormulario: {
      name: "Route Name",
      zona: "Zone",
      descripcion: "Description",
      paginaWeb: "Website (URL)",
      fotos: "Photo URLs",
      tipoRuta: "Route Type",
      private: "Private",
      estado: "Route Status",
      rules: {
        required: "Required field",
        urlInvalid: "Must be a valid URL",
        selectAtLeastOneType: "Select at least one route type",
        invalidList: "Must be a valid list of URLs"
      }
    },
    routeColumns: {
      select: "Select",
      id: "ID",
      localizacion: "Location",
      name: "Route Name",
      map: "Map",
      zona: "Zone",
      paginaWeb: "Website",
      seePage: "View Page",
      noWebsite: "No website",
      fotos: "Photos",
      photosAvailable: "Photo(s) available",
      noPhotos: "No photos",
      descripcion: "Description",
      denuncias: "Reports",
      distance: "Distance",
      duration: "Duration",
      elevation: "Elevation",
      valoracion: "Rating",
      private: "Private",
      accion: "Action"
    }
  },

  mainLayout: {
    title: "Mallorca Beach",
    selectLanguage: "Select Language",
    admin: "Admin Panel",
  },

  roleRequestPage: {
    managerGeneral: {
      title: "Role Request",
    },
    rolesColumns: {
      select: "Select",
      id: "ID",
      user: "User",
      role: "Role",
      urlPhotoDni: "DNI Photo",
      urlOfficialDoc: "Official Document",
      approved: "Approved",
      accion: "Action"
    }
  },

  linksList: {
    home: {
      title: "Home",
      caption: "Main page"
    },
    user: {
      title: "Manage Users",
      caption: "CRUD Users"
    },
    roles: {
      title: "Manage Roles",
      caption: "CRUD"
    },
    beaches: {
      title: "Manage Beaches",
      caption: "CRUD Beaches"
    },
    routes: {
      title: "Manage Routes",
      caption: "CRUD Routes"
    },
    roleRequests: {
      title: "Manage Approvals",
      caption: "@QuasarFramework"
    },
    complaints: {
      title: "Manage Complaints",
      caption: "Community Quasar projects"
    },
    events: {
      title: "Manage Events",
      caption: "Community Quasar projects"
    },
    pointsOfInterest: {
      title: "Global Points",
      caption: "Community Quasar projects"
    },
    translateQuasarPage:{
      title: "Tanslate element Quasar",
      caption: "Send a JSON to Spring for dynamic translation"
    }

  },



};
