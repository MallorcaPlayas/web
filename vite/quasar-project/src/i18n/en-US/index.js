// This is just an example,
// so you can safely delete all default props below

export default {
  hello: "Hello World!",
  welcome: "Welcome to my app",
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
      denuncias: "Complaints",
      paginaWeb: "Website",
      accion: "Action",
      noPhotos: "No photos",
      noCamera: "No camera",
      noWebsite: "No website",
      seeCamera: "View Camera",
      seePage: "View Page"
    }
  },

  managerGeneral: {
    ConfirmDialog: {
      title: "What action do you want to perform with the {item}?",
      message: "Choose an option for the {item}: {name}",
    }
  },

  crudTable: {
    btn: {
      delete: "Delete Selected {title}s",
    }
  },

  confirmDialog: {}
};
