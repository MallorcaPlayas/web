const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  // Crear una nueva ruta para la página de Acerca de Usuarios
  {
    // como usar esta ruta: http://localhost:2222/#/user
    path: '/routes',
    component: () => import('layouts/managerRoute.vue'),
  },
  {
    // como usar esta ruta: http://localhost:2222/#/user
    path: '/user',
    component: () => import('layouts/manageUser.vue'),
  },

  {
    // como usar esta ruta: http://localhost:2222/#/user
    path: '/beach',
    component: () => import('layouts/managerBeach.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
