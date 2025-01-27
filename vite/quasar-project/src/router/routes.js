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
    path: '/routes',
    component: () => import('layouts/managerRoute.vue'),
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/user',
    component: () => import('layouts/manageUser.vue'),
  },
  {
    path: '/beaches',
    component: () => import('layouts/managerBeach.vue'),
  },
  {
    path: '/excursions',
    component: () => import('layouts/managerExcursions.vue'),
  },
  {
    path: '/roles',
    component: () => import('layouts/managerRole.vue'),
  },
  {
    path: '/prof-orders',
    component: () => import('layouts/managerProfOrder.vue'),
  },
  {
    path: '/complaints',
    component: () => import('layouts/managerComplaints.vue'),
  },
  {
    path: '/points-of-interest',
    component: () => import('layouts/managerPointsOfInterest.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
