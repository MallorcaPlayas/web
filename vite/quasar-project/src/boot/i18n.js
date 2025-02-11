  import { defineBoot } from '#q-app/wrappers'
  import { createI18n } from 'vue-i18n'
  import messages from 'src/i18n'

  export default defineBoot(({ app }) => {
    const i18n = createI18n({
      locale: localStorage.getItem('lang') || 'es', // Guardar idioma en localStorage
      globalInjection: true, // // Permite usar $t en cualquier parte de la aplicación
      messages
    })

    // Set i18n instance on app
    app.use(i18n)
  })
