import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import { renderToString } from '@vue/server-renderer';

import App from './App.vue';
import HomePage from './components/HomePage.vue';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// Add icons to the library
library.add(
  faHeart,
  faHeartRegular,
  faShoppingCart,
  faSearch,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faXmark
);

export async function render(url: string, manifest: Record<string, string[]>) {
  // Create router with memory history for SSR
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: HomePage,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/',
      },
    ],
  });

  // Set the URL for the router
  await router.push(url);
  await router.isReady();

  // Create app with SSR
  const app = createSSRApp(App);
  const pinia = createPinia();

  // Register FontAwesome component globally
  app.component('FontAwesomeIcon', FontAwesomeIcon);

  // Use plugins
  app.use(pinia);
  app.use(router);

  // Render the app to HTML
  const ctx: { modules: Set<string> } = { modules: new Set() };
  const html = await renderToString(app, ctx);

  // Generate preload links
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  return [html, preloadLinks];
}

function renderPreloadLinks(
  modules: Set<string>,
  manifest: Record<string, string[]>
) {
  let links = '';
  const seen = new Set();
  modules.forEach(id => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = file;
          if (filename.endsWith('.js')) {
            links += `<link rel="modulepreload" crossorigin href="${filename}">`;
          } else if (filename.endsWith('.css')) {
            links += `<link rel="stylesheet" href="${filename}">`;
          }
        }
      });
    }
  });
  return links;
}
