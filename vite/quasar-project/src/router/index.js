import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'


export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  // Middleware de autenticación
  //  redirigir a los usuarios no autenticados a la página de login (/login).
  // beforeEach: Se ejecuta antes de cada cambio de ruta.
  // to: Ruta a la que se intenta acceder.
  // from: Ruta desde la que se intenta acceder.
  // next: Función que permite la navegación a la ruta solicitada o a otra ruta diferente (redirección).
  Router.beforeEach((to, from, next) => {
    // localStorage.clear();
    const token = localStorage.getItem('authToken'); // Obtener el token


    // Comprueba que el token existe, y no es null ni undefined
    // Si isAuthenticated es true, significa que el usuario está autenticado.
    const isAuthenticated = token && token !== 'null' && token !== 'undefined'; // Asegurar que es válido

    // console.log('Ruta a la que se intenta acceder:', to.path);
    // console.log('¿La ruta requiere autenticación?:', to.meta.requiresAuth);
    // console.log('Token en localStorage:', token);
    // console.log('Usuario autenticado:', isAuthenticated);

    // Si la ruta requiere autenticación y el usuario NO está autenticado
    if (to.meta.requiresAuth && !isAuthenticated) {
      console.warn('Acceso denegado. Redirigiendo a Login.');
      return next('/login'); // Redirigir a login
    }

    if (to.meta.isAuth && isAuthenticated) {
      console.warn('Ya has hecho el login. Redirigiendo a Home.');
      return next('/'); // Redirigir a home
    }

    next(); // Permitir navegación si está autenticado o la ruta no requiere auth
  });

  return Router;
});
