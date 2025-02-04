// pongo todas los enlaces en una unica clase para luego exportarla y usarla donde yo quiera
export const linksList = [
  {
    title: 'Home',
    caption: '', // short description
    icon: 'home', // icon can be select from this page -> https://fonts.google.com/icons?selected=Material+Symbols+Outlined:group:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=user&icon.size=24&icon.color=%23e8eaed
    link: '/' // Actualizado para usar la ruta interna
  },
  {
    title: 'Gestionar Usuario',
    caption: 'CRUD usuario', // short description
    icon: 'group', // icon can be select from this page -> https://fonts.google.com/icons?selected=Material+Symbols+Outlined:group:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=user&icon.size=24&icon.color=%23e8eaed
    link: '/user' // Actualizado para usar la ruta interna
  },
  {
    title: 'Gestionar Roles',
    caption: 'CRUD',
    icon: 'manage_accounts',
    link: '/roles' // Ejemplo de otra ruta interna
  },
  {
    title: 'Gestionar Playas',
    caption: 'CRUD Playas',
    icon: 'beach_access',
    link: '/beaches'
  },
  {
    title: 'Gestionar Rutas',
    caption: 'CRUD Rutas',
    icon: 'route',
    link: '/routes'
  },
  {
    title: 'Gestionar Aprovaciones',
    caption: '@QuasarFramework',
    icon: 'approval',
    link: '/role-requests'
  },
  {
    title: 'Administrar Denuncias',
    caption: 'Community Quasar projects',
    icon: 'report',
    link: '/complaints'
  },
  {
    title: 'Gestionar Eventos',
    caption: 'Community Quasar projects',
    icon: 'event',
    link: '/excursions'
  },
  {
    title: 'Puntos Globales',
    caption: 'Community Quasar projects',
    icon: 'signpost',
    link: '/points-of-interest'
  }
]
