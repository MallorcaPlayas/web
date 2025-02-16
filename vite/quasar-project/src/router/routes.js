const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {requiresAuth: true},
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'routes',
        component: () => import('pages/RoutePage.vue'),
      },
      {
        path: 'user',
        component: () => import('pages/UserPage.vue'),
      },
      {

        path: 'beaches',
        component: () => import('pages/BeachPage.vue'),
      },
      {
        path: 'excursions',
        component: () => import('pages/ExcursionPage.vue'),
      },
      {
        path: 'roles',
        component: () => import('pages/RolePage.vue'),
      },
      {
        path: 'role-requests',
        component: () => import('pages/RoleRequestPage.vue'),
      },
      {
        path: 'complaints',
        component: () => import('pages/ComplaintsPage.vue'),
      },
      {
        path: 'points-of-interest',
        component: () => import('pages/PointsOfInterestPage.vue'),
      },
      {
        path: 'translator',
        component: () => import('pages/TranslatorPage.vue'),
      },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: {isAuth: true},
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;
