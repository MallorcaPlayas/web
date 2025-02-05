const routes = [
  // Este array contiene objetos con las rutas de la aplicación
  /*
  * El array routes contiene objetos que representan las rutas de la aplicación. Cada objeto tiene:

    path: Define la URL asociada a la ruta.
    component: Especifica el componente que se carga cuando se accede a esa ruta.
    children (Opcional): Define subrutas dentro de una ruta padre.
    meta (Opcional): Permite definir metadatos personalizados, como requiresAuth, que indica si la ruta requiere autenticación.
  * */
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue'), meta: {requiresAuth: true}} // Protegido, primero haces login
    ]
  },
  {path: '/login', component: () => import('pages/LoginPage.vue')},
  {path: '/user', component: () => import('layouts/manageUser.vue'), meta: {requiresAuth: true}},
  {path: '/beaches', component: () => import('layouts/managerBeach.vue'), meta: {requiresAuth: true}},
  {path: '/excursions', component: () => import('layouts/managerExcursions.vue'), meta: {requiresAuth: true}},
  {path: '/roles', component: () => import('layouts/managerRole.vue'), meta: {requiresAuth: true}},
  {path: '/role-requests', component: () => import('layouts/managerRoleRequest.vue'), meta: {requiresAuth: true}},
  {path: '/complaints', component: () => import('layouts/managerComplaints.vue'), meta: {requiresAuth: true}},
  {
    path: '/points-of-interest',
    component: () => import('layouts/managerPointsOfInterest.vue'),
    meta: {requiresAuth: true}
  },
  {path: '/:catchAll(.*)*', component: () => import('pages/ErrorNotFound.vue')}
];

export default routes;
