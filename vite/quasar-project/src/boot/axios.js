import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import {useRouter} from 'vue-router';

const api = axios.create({ baseURL: process.env.API_SPRING_BASE_URL })
const router = useRouter();

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response) {
      console.error(`Error ${error.response.status}:`, error.response.data)
      if (error.response.status === 401) {
        console.warn('No autorizado, redirigiendo a login...')
        await router.push('/login');
      }
    }
    return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api

})

export { api }
