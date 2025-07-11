import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'

import App from './App.vue'
import HomePage from './components/HomePage.vue'

export async function render(url: string, manifest: any) {
  // Create router with memory history for SSR
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: HomePage
      }
    ]
  })

  // Set the URL for the router
  await router.push(url)
  await router.isReady()

  // Create app with SSR
  const app = createSSRApp(App)
  const pinia = createPinia()

  // Use plugins
  app.use(pinia)
  app.use(router)

  // Render the app to HTML
  const ctx: any = {}
  const html = await renderToString(app, ctx)

  // Generate preload links
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)

  return [html, preloadLinks]
}

function renderPreloadLinks(modules: string[], manifest: any) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = file
          if (filename.endsWith('.js')) {
            links += `<link rel="modulepreload" crossorigin href="${filename}">`
          } else if (filename.endsWith('.css')) {
            links += `<link rel="stylesheet" href="${filename}">`
          }
        }
      })
    }
  })
  return links
} 