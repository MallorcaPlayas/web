const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: 'routes',
        component: () => import('pages/RoutePage.vue'),
        meta: {requiresAuth: false},
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: {isAuth: true},
      },
      {
        path: 'user',
        component: () => import('pages/UserPage.vue'),
        meta: {requiresAuth: true},
      },
      {

        path: 'beaches',
        component: () => import('pages/BeachPage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: 'excursions',
        component: () => import('pages/ExcursionPage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: 'roles',
        component: () => import('pages/RolePage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: 'role-requests',
        component: () => import('pages/RoleRequestPage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: 'complaints',
        component: () => import('pages/ComplaintsPage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: 'points-of-interest',
        component: () => import('pages/PointsOfInterestPage.vue'),
        meta: {requiresAuth: true},
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      }
    ]
  },
]

export default routes;
